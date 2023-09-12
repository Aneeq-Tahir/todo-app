import { NewTodo, Todo, db, todoTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
   try {
      const res: Todo[] = await db.select().from(todoTable);
      return NextResponse.json({ data: res });
   } catch (err) {
      console.log(err);
      return NextResponse.json({ message: "smth went wrong" });
   }
};

export const POST = async (request: NextRequest) => {
   const req: Todo = await request.json();
   try {
      const res: NewTodo[] = await db
         .insert(todoTable)
         .values({ task: req.task })
         .returning();
      return NextResponse.json({ message: "data added to the db", data: res });
   } catch (err) {
      console.log((err as { message: string }).message);
      return NextResponse.json({ message: "smth went wrong" });
   }
};

export const DELETE = async (request: NextRequest) => {
   const url = request.nextUrl;
   try {
      const id = Number(url.searchParams.get("id"));
      const res = await db
         .delete(todoTable)
         .where(eq(todoTable.id, id))
         .returning();
      return NextResponse.json({ message: "task removed from the db" });
   } catch (err) {
      console.log((err as { message: string }).message);
      return NextResponse.json({ message: err });
   }
};
