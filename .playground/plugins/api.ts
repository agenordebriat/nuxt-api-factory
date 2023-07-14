import { UserRepository, defineNuxtPlugin } from "#imports"

export default defineNuxtPlugin(() => {
  return {
    provide: {
      api: {
        users: new UserRepository({
          baseURL: "https://jsonplaceholder.typicode.com",
        }),
      },
    },
  }
})
