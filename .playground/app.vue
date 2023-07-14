<script setup lang="ts">
import { useNuxtApp } from "#imports"

const { data } = await useNuxtApp().$api.users.getAll()

function getInitials(name: string) {
  return name
    .split(" ")
    .reduce((acc, cur) => {
      if (cur.endsWith(".") || acc.length === 2) return acc

      return acc + cur.charAt(0)
    }, "")
    .toUpperCase()
}
</script>

<template>
  <Body class="min-h100vh bg-neutral9 p6 font-sans c-white" />
  <h2 class="mb4 text-xl fw600">
    Get users
  </h2>
  <ul class="grid gap-y3">
    <li v-for="user in data" :key="user.id" class="flex items-center gap-x3">
      <div
        class="relative h9 w9 flex items-center justify-center rounded-full bg-neutral8 fw600 before-(absolute rounded-full bg-gradient-from-green bg-gradient-via-cyan bg-gradient-to-emerald bg-gradient-to-r content-empty -inset-2px -z1)"
      >
        {{ getInitials(user.name) }}
      </div>
      <div class="grid">
        <span>{{ user.name }}</span>
        <a
          :href="user.website"
          class="text-xs c-emerald2 underline underline-(offset-3.5 dashed)"
        >
          {{ user.website }}
        </a>
      </div>
    </li>
  </ul>
</template>
