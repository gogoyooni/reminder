"use server";

import prisma from "@/lib/prisma";
import { createTaskSchemaType } from "@/schema/createTask";
import { currentUser } from "@clerk/nextjs";

// @CREATE- create task
export async function createTask(data: createTaskSchemaType) {
  const user = await currentUser();

  if (!user) {
    throw new Error("user is not found");
  }

  const { content, expiresAt, collectionId } = data;

  return await prisma.task.create({
    data: {
      userId: user.id,
      content,
      expiresAt,
      Collection: {
        connect: {
          id: collectionId,
        },
      },
    },
  });
}
// @UPDATE- update task
export async function setTaskDone(id: number, taskIsDone: boolean) {
  const user = await currentUser();

  if (!user) {
    throw new Error("user is not found");
  }

  return await prisma.task.update({
    where: {
      id,
      userId: user.id,
    },
    data: {
      done: !taskIsDone,
    },
  });
}
