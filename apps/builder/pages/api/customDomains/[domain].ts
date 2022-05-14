import { withSentry } from '@sentry/nextjs'
import prisma from 'libs/prisma'
import { NextApiRequest, NextApiResponse } from 'next'
import { badRequest, methodNotAllowed, notAuthenticated } from 'utils'
import { got } from 'got'
import { getAuthenticatedUser } from 'services/api/utils'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const user = await getAuthenticatedUser(req)
  if (!user) return notAuthenticated(res)
  const workspaceId = req.query.workspaceId as string | undefined
  if (!workspaceId) return badRequest(res)
  if (req.method === 'DELETE') {
    const domain = req.query.domain.toString()
    try {
      await deleteDomainOnVercel(domain)
    } catch {}
    const customDomains = await prisma.customDomain.delete({
      where: { name: domain },
    })
    console.log(
      {
        name: domain,
        workspace: { id: workspaceId },
      },
      { some: { userId: user.id } }
    )
    await deleteDomainOnVercel(domain)
    return res.send({ customDomains })
  }
  return methodNotAllowed(res)
}

const deleteDomainOnVercel = (name: string) =>
  got.delete({
    url: `https://api.vercel.com/v8/projects/${process.env.VERCEL_VIEWER_PROJECT_NAME}/domains/${name}?teamId=${process.env.VERCEL_TEAM_ID}`,
    headers: { Authorization: `Bearer ${process.env.VERCEL_TOKEN}` },
  })

export default withSentry(handler)