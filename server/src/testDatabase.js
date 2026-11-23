import assert from "node:assert/strict";
import mongoose from "mongoose";

export async function testDatabase() {
  const collection = mongoose.connection.db.collection(
    "connection_checks"
  );

  const testId = new mongoose.Types.ObjectId();

  try {
    await collection.insertOne({
      _id: testId,
      name: "MenuPilot connection test",
      status: "created",
      createdAt: new Date(),
    });

    console.log("PASS: Create a test record");

    const savedRecord = await collection.findOne({ _id: testId });

    assert.equal(savedRecord?.status, "created");
    console.log("PASS: Read the saved record");

    const updateResult = await collection.updateOne(
      { _id: testId },
      { $set: { status: "updated" } }
    );

    assert.equal(updateResult.modifiedCount, 1);

    const updatedRecord = await collection.findOne({ _id: testId });

    assert.equal(updatedRecord?.status, "updated");
    console.log("PASS: Update the record and verify the change");

    const deleteResult = await collection.deleteOne({ _id: testId });

    assert.equal(deleteResult.deletedCount, 1);

    const deletedRecord = await collection.findOne({ _id: testId });

    assert.equal(deletedRecord, null);
    console.log("PASS: Delete the record and verify removal");

    console.log("Database test completed successfully.");
  } finally {
    await collection.deleteOne({ _id: testId });
  }
}