import { use, server } from 'nexus'
import { prisma } from 'nexus-plugin-prisma'
import cors from 'cors';
server.express.use(cors())
use(prisma({ features: { crud: true } }));

