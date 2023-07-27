import { UserRepository } from "#imports"

export default <T extends keyof typeof repositories>(key: T) => {
  const repositories = {
    users: new UserRepository({
      baseURL: "https://jsonplaceholder.typicode.com",
    }),
  }

  return repositories[key]
}
