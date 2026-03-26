// getNextQuoteNumber.ts
import Counter from "@/models/Counter";

async function getNextQuoteNumber(): Promise<string> {
  const counter = await Counter.findOneAndUpdate(
    { _id: "quoteNumber" },
    { $inc: { seq: 1 } },
    { new: true, upsert: true },
  );

  const padded = String(counter.seq).padStart(4, "0");
  return `Q-${padded}`;
}

export default getNextQuoteNumber;
