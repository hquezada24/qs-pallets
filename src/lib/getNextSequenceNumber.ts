// lib/getNextSequenceNumber.ts
import Counter from "@/models/Counter";

export async function getNextSequenceNumber(
  name: string,
  prefix: string,
  digits: number = 4,
): Promise<string> {
  const counter = await Counter.findOneAndUpdate(
    { _id: name },
    { $inc: { seq: 1 } },
    { new: true, upsert: true },
  );

  const padded = String(counter.seq).padStart(digits, "0");
  return `${prefix}-${padded}`;
}
