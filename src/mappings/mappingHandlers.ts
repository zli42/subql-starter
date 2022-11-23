import {
  // SubstrateExtrinsic,
  SubstrateEvent,
  // SubstrateBlock,
} from "@subql/types";
import { Transfer } from "../types";
import { Balance } from "@polkadot/types/interfaces";

// export async function handleBlock(block: SubstrateBlock): Promise<void> {
//   //Create a new starterEntity with ID using block hash
//   let record = new StarterEntity(block.block.header.hash.toString());
//   //Record block number
//   record.field1 = block.block.header.number.toNumber();
//   await record.save();
// }

export async function handleEvent(event: SubstrateEvent): Promise<void> {
  // Get data from the event
  // The balances.transfer event has the following payload \[from, to, value\]
  // logger.info(JSON.stringify(event));
  const fromAccount = event.event.data[0];
  const toAccount = event.event.data[1];
  const balanceChange = event.event.data[2];

  // Create the new transfer entity
  const transfer = new Transfer(
    `${event.block.block.header.number.toNumber()}-${event.idx}`
  );
  transfer.blockNumber = event.block.block.header.number.toBigInt();
  transfer.fromAccount = fromAccount.toString();
  transfer.toAccount = toAccount.toString();
  transfer.balanceChange = (balanceChange as Balance).toBigInt();
  transfer.timestamp = event.block.timestamp;
  await transfer.save();
}

// export async function handleCall(extrinsic: SubstrateExtrinsic): Promise<void> {
//   const record = await StarterEntity.get(
//     extrinsic.block.block.header.hash.toString()
//   );
//   //Date type timestamp
//   record.field4 = extrinsic.block.timestamp;
//   //Boolean tyep
//   record.field5 = true;
//   await record.save();
// }
