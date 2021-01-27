import formidable from "formidable";
// We could have usedregular 'fs' and not a promise one
import { promises as fs } from "fs";
import path from "path";
import handler from "../../apiHandlers/handler";
import { client, q } from "../../lib/fauna";

// first we need to disable the default body parser
export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler.put(async (req, res) => {
  if ((req as any).session.get("user")) {
    const imagePath = path.join(`./public/uploads/verificationPapers/`);
    // creating the directory
    await fs.mkdir(imagePath, { recursive: true });
    // parse form with a Promise wrapper
    await new Promise((resolve, reject) => {
      var form = new formidable.IncomingForm();
      form.uploadDir = imagePath;
      form.multiples = true;
      form.keepExtensions = true;
      // renaming the file first parameter is the file name
      form.on("fileBegin", (filename, file) => {
        form.emit("data", { name: "fileBegin", filename, value: file });
      });

      // saving the file to the local folder
      form.parse(req, async (err, fields, files) => {
        if (err) return reject(err);

        for (let [key, value] of Object.entries(files)) {
          // bankAccountStatements has multiple file inputs
          if (key === "bankAccountStatements") {
            let temp = "";
            (value as any).map((v: formidable.File) => {
              temp = temp + v.path.replace(/^.*[\\\/]/, "") + "#";
            });
            fields[key] = temp;
          } else fields[key] = (value as any).path.replace(/^.*[\\\/]/, ""); // returns the filename and extenstion from the path
        }

        // sending data to the database
        try {
          const updatedData = {
            // Personal
            name: (fields as any).name,
            email: (fields as any).email,
            dateOfBirth: (fields as any).dateOfBirth,
            gender: (fields as any).gender,
            // contact information
            address: (fields as any).address,
            mobileNo: (fields as any).mobileNo,
            // checking salaried individual or self-employed
            borrowerType: (fields as any).borrowerType,
            verified: "pending",
            // verificationphotos
            verificationPhotos: {
              nidOrPassport: (fields as any).nidOrPassport,
              addressProof: (fields as any).addressProof,
              recentPhoto: (fields as any).recentPhoto,
              bankAccountStateMents: (fields as any).bankAccountStateMents,
              businessProof: (fields as any).businessProof,
              salarySlip: (fields as any).salarySlip,
              employeeIdCard: (fields as any).employeeIdCard,
            },
          };
          await client.query(
            q.Update(
              q.Select(
                ["ref"],
                q.Get(q.Match(q.Index("search_by_id"), (fields as any).userId))
              ),
              {
                data: updatedData,
              }
            )
          );
          resolve({ fields, files });
        } catch (e) {
          console.log(e);
        }
      });
    });
    return res.status(200).json("ok");
    // console.log("data: ", data);
  }
  return res.status(422).json("ok");
});
