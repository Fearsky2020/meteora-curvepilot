import type { NextApiRequest, NextApiResponse } from 'next';
import { Connection, sendAndConfirmRawTransaction, Transaction } from '@solana/web3.js';

const RPC_URL = process.env.RPC_URL;
const SOLANA_CLUSTER = process.env.SOLANA_CLUSTER;

function isDevnetConfigured() {
  if (SOLANA_CLUSTER !== 'devnet' || !RPC_URL) return false;
  try {
    const url = new URL(RPC_URL);
    return url.protocol === 'https:' && url.hostname.toLowerCase().includes('devnet');
  } catch {
    return false;
  }
}

type SendTransactionRequest = {
  signedTransaction?: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  if (!isDevnetConfigured()) {
    return res.status(503).json({ error: 'Transaction relay is disabled unless explicit Solana devnet settings are present.' });
  }

  try {
    const { signedTransaction } = req.body as SendTransactionRequest;
    if (!signedTransaction || signedTransaction.length > 16_384) {
      return res.status(400).json({ error: 'Missing or oversized signed transaction.' });
    }

    const connection = new Connection(RPC_URL as string, 'confirmed');
    const transaction = Transaction.from(Buffer.from(signedTransaction, 'base64'));
    const simulation = await connection.simulateTransaction(transaction);

    if (simulation.value.err) {
      return res.status(400).json({ error: 'Devnet transaction simulation failed.', details: simulation.value.err });
    }

    const signature = await sendAndConfirmRawTransaction(connection, transaction.serialize(), {
      commitment: 'confirmed',
    });
    return res.status(200).json({ success: true, cluster: 'devnet', signature });
  } catch (error) {
    console.error('Devnet transaction relay error');
    return res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
  }
}
