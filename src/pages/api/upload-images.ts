import handler from "../../apiHandlers/handler";
import path from "path";
import { promises as fs } from "fs";
import formidable from "formidable";

// we need to disable the default body parser
// to parse form data
export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler.put(async (req, res) => {
  // creating the directory
  const imagePath = path.join(`./public/uploads/verificationPapers/`);
  await fs.mkdir(imagePath, { recursive: true });
  try {
    await new Promise((resolve, reject) => {
      const form = new formidable.IncomingForm();
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
          } else if ("path" in value) {
            // returns the filename and extension from the path
            fields[key] = value.path.replace(/^.*[\\\/]/, "");
          }
        }
        const verificationPhotos = {
          nidOrPassport: (fields as any).nidOrPassport,
          addressProof: (fields as any).addressProof,
          recentPhoto: (fields as any).recentPhoto,
          bankAccountStatements: (fields as any).bankAccountStatements,
          businessProof: (fields as any).businessProof,
          salarySlip: (fields as any).salarySlip,
          employeeIdCard: (fields as any).employeeIdCard,
        };
        resolve({ fields, files });
        return res.status(200).json(verificationPhotos);
      });
    });
  } catch (e) {
    console.log(e);
    return res.end();
  }
});
