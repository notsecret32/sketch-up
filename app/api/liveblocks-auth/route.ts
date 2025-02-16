import { auth, currentUser } from '@clerk/nextjs/server';
import { Liveblocks } from '@liveblocks/node';
import { ConvexHttpClient } from 'convex/browser';

import { CONVEX_URL, LIVEBLOCKS_SECRET_KEY } from '@/config';
import { api } from '@/convex/_generated/api';

const convex = new ConvexHttpClient(CONVEX_URL);

const liveblocks = new Liveblocks({
  secret: LIVEBLOCKS_SECRET_KEY,
});

export async function POST(req: Request) {
  const authorization = await auth();
  const user = await currentUser();

  if (!authorization || !user) {
    return new Response('Unauthorized', { status: 403 });
  }

  const { room } = await req.json();

  const board = await convex.query(api.board.get, { id: room });

  if (!board || board?.organizationId !== authorization.orgId) {
    return new Response("You don't have access to this board", { status: 403 });
  }

  const userInfo = {
    name: user.fullName || 'Anonymous',
    picture: user.imageUrl,
  };

  const session = liveblocks.prepareSession(user.id, { userInfo });

  if (room) {
    session.allow(room, session.FULL_ACCESS);
  }

  const { status, body } = await session.authorize();

  return new Response(body, { status });
}
