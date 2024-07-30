// Do not edit this file manually
import { parseBlockCredentials, parseBlockSchema } from '@typebot.io/forge'
import { difyAiBlock } from '.'
import { auth } from './auth'

export const difyAiBlockSchema = parseBlockSchema(difyAiBlock)
export const difyAiCredentialsSchema = parseBlockCredentials(
  difyAiBlock.id,
  auth.schema
)
