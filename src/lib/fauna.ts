import faunadb from "faunadb";
import { FAUNA_ADMIN_KEY } from "../utils/constants";

export const q = faunadb.query;

export const client = new faunadb.Client({ secret: FAUNA_ADMIN_KEY });

export const getUserByIndex = async (value: string, index: string) => {
  const { data }: any = await client.query(
    q.Get(q.Match(q.Index(index), value))
  );
  return data;
};

export const getValuesWithIndex = async (index: string, value: string) => {
  const { data }: any = await client.query(
    q.Map(
      q.Paginate(q.Match(q.Index(index), value)),
      q.Lambda("ref", q.Get(q.Var("ref")))
    )
  );
  const dataArray = data.map((snippet: any) => {
    snippet.id = snippet.ref.id;
    delete snippet.ref;
    return snippet;
  });

  return dataArray;
};

export const sendDataToFauna = async (data: {}) => {
  const user: any = await client.query(
    q.Create(q.Collection("users"), {
      data,
    })
  );
  return user;
};

export const updateFaunaDataWithIdIndex = async (data: {}, id: string) => {
  const user: any = await client.query(
    q.Update(q.Select(["ref"], q.Get(q.Match(q.Index("search_by_id"), id))), {
      data: data,
    })
  );
  return user;
};
