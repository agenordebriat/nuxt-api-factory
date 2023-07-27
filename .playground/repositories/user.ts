import type { Options } from "api-factory"
import type { z } from "zod"
import { Users } from "../schemas/user"
import { factory as RepositoriesFactory } from "#imports"

export class UserRepository extends RepositoriesFactory {
  getAll = () => {
    const defaults: Options<z.infer<typeof Users>> = {
      options: {
        transform: (data) => {
          return data.map(({ id, name, website }) => ({ id, name, website }))
        },
      },
    }

    return this.fetch("/users", Users, "Get all users", defaults)
  }
}
