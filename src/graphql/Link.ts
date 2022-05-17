import { extendType, objectType, nonNull, stringArg, idArg } from 'nexus'
import { NexusGenObjects } from '../../nexus-typegen'

export const Link = objectType({
  name: 'Link',
  definition(t) {
    t.nonNull.int('id')
    t.nonNull.string('description')
    t.nonNull.string('url')
  },
})

let links: NexusGenObjects['Link'][] = [
  {
    id: 1,
    url: 'www.graphql.com',
    description: 'Fullstack tutorial for graphql',
  },
  {
    id: 2,
    url: 'graphql.org',
    description: 'graphql official wenbsite',
  },
]

export const LinkQuery = extendType({
  // 2
  type: 'Query',
  definition(t) {
    t.nonNull.list.nonNull.field('feed', {
      // 3
      type: 'Link',
      resolve(parent, args, context, info) {
        // 4
        return links
      },
    })
  },
})

export const LinkMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('post', {
      type: 'Link',
      args: {
        description: nonNull(stringArg()),
        url: nonNull(stringArg()),
      },

      resolve(parent, args, context) {
        const { description, url } = args

        let idCount = links.length + 1
        const link = {
          id: idCount,
          description: description,
          url: url,
        }
        links.push(link)
        return link
      },
    })
  },
})

export const PostMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('updateLink', {
      type: 'Link',
      args: {
        id: nonNull(idArg()),
        url: stringArg(),
        description: stringArg(),
      },
      // @ts-ignore t
      resolve(parent, args, context) {},
    })
  },
})

export const DeleteLink = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('deleteLink', {
      type: 'Link',
      args: {
        id: nonNull(idArg()),
      },
      // @ts-ignore
      resolve(parent, args, context, info) {},
    })
  },
})

export const LinkQueryById = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.field('link', {
      type: 'Link',
      args: {
        id: nonNull(idArg()),
      },
      // @ts-ignore
      resolve(parent, args, context, info) {},
    })
  },
})
