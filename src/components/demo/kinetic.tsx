import { BalanceResponse, KineticSdk } from '@kin-kinetic/sdk'
import { Keypair } from '@kin-kinetic/keypair'
import { Commitment } from '@kin-kinetic/solana'

export const openExplorer = ({
  account,
  transaction,
  accountBalance,
}: {
  account?: string
  accountBalance?: string
  transaction?: string
}) => {
  if (transaction) {
    window.open(`https://explorer.solana.com/tx/${transaction}?cluster=devnet`)
  } else if (account) {
    window.open(`https://explorer.solana.com/address/${account}?cluster=devnet`)
  } else if (accountBalance) {
    window.open(`https://explorer.solana.com/address/${accountBalance}/tokens?cluster=devnet`)
  }
}

const clientOptions = {
  environment: 'devnet', // mainnet or devnet
  index: 407, // your App Index
  endpoint: 'https://sandbox.kinetic.host', // devnet endpoint
}

let kineticClient: KineticSdk | undefined

export const setupKineticClient = async (onSuccess: (kinetic: KineticSdk) => void, onFailure: () => void) => {
  console.log('🚀 ~ setupKineticClient')
  if (kineticClient) {
    onSuccess && onSuccess(kineticClient)
  }
  try {
    kineticClient = await KineticSdk.setup(clientOptions)
    onSuccess && onSuccess(kineticClient)
  } catch (error) {
    console.log('🚀 ~ error', error)
    kineticClient = undefined
    onFailure && onFailure()
  }
}
export const createKeypair = async (onSuccess: (keypair: Keypair) => void, onFailure: () => void) => {
  console.log('🚀 ~ createKeypair')

  try {
    const mnemonic = Keypair.generateMnemonic()
    const keypair = Keypair.fromSecret(mnemonic)
    onSuccess && onSuccess(keypair)
  } catch (error) {
    console.log('🚀 ~ error', error)
    onFailure && onFailure()
  }
}
export const createAccount = async (
  onSuccess: (signature?: string, alreadyExists?: boolean) => void,
  onFailure: () => void,
  keypair: Keypair,
) => {
  console.log('🚀 ~ createAccount')

  try {
    const accountOptions = {
      owner: keypair,
      commitment: Commitment.Finalized, // Optional, can be Finalized, Confirmed, Processed
    }
    const transaction = kineticClient && (await kineticClient.createAccount(accountOptions))
    onSuccess && onSuccess(transaction.signature)
  } catch (error) {
    console.log('🚀 ~ error', error, error.message)
    if (error?.message?.includes('already has an account for mint')) {
      console.log('🚀 ~ error.message', error.message)
      onSuccess && onSuccess(undefined, true)
    } else {
      onFailure && onFailure()
    }
  }
}

export const getBalance = async (
  onSuccess: (balance: BalanceResponse) => void,
  onFailure: (error: boolean) => void,
  keypair: string,
) => {
  console.log('🚀 ~ getBalance')

  try {
    const balanceOptions = {
      account: keypair,
    }
    const balance = kineticClient && (await kineticClient.getBalance(balanceOptions))
    onSuccess && balance && onSuccess(balance)
  } catch (error) {
    console.log('🚀 ~ error', error)
    onFailure && onFailure(true)
  }
}

export const airdrop = async (
  onSuccess: (balance: BalanceResponse) => void,
  onFailure: (error: boolean) => void,
  keypair: string,
) => {
  console.log('🚀 ~ airdrop')

  try {
    const airdropOptions = {
      account: keypair,
      amount: '1000',
      commitment: Commitment.Finalized,
    }
    kineticClient && (await kineticClient.requestAirdrop(airdropOptions))
    const balanceOptions = {
      account: keypair,
    }
    const balance = kineticClient && (await kineticClient.getBalance(balanceOptions))
    onSuccess && balance && onSuccess(balance)
  } catch (error) {
    console.log('🚀 ~ error', error)
    onFailure && onFailure(true)
  }
}

export const makeTransfer = async (
  onSuccess: (balance: BalanceResponse, signature: string) => void,
  onFailure: (error: boolean) => void,
  keypair: Keypair,
  amount?: 'string',
) => {
  console.log('🚀 ~ makeTransfer')

  try {
    let sendAmount

    if (!amount) {
      const balanceCheck = await kineticClient?.getBalance({ account: keypair.publicKey })
      sendAmount = balanceCheck?.balance
    } else {
      sendAmount = amount
    }

    if (sendAmount) {
      const makeTransferOptions = {
        destination: '3AQwygEJCSpNZc9fomYx7U2XZhE9QSKwa3B1CKzagJLb',
        owner: keypair,
        amount: sendAmount,
        commitment: Commitment.Finalized,
      }
      const transaction = kineticClient && (await kineticClient.makeTransfer(makeTransferOptions))
      console.log('🚀 ~ transaction', transaction)

      const balanceOptions = {
        account: keypair.publicKey,
      }

      const balance = kineticClient && (await kineticClient.getBalance(balanceOptions))
      onSuccess && transaction?.signature && balance && onSuccess(balance, transaction?.signature)
    } else {
      throw new Error('No Amount Specified')
    }
  } catch (error) {
    console.log('🚀 ~ error', error)
    onFailure && onFailure(true)
  }
}

export const closeAccount = async (onSuccess: () => void, onFailure: (error: boolean) => void, keypair: string) => {
  console.log('🚀 ~ closeAccount')

  try {
    const closeAccountOptions = {
      account: keypair,
    }
    const transaction = kineticClient && (await kineticClient.closeAccount(closeAccountOptions))
    console.log('🚀 ~ transaction', transaction)
    onSuccess && onSuccess()
  } catch (error) {
    console.log('🚀 ~ error', error)
    onFailure && onFailure(true)
  }
}
