<template>
  <div
    class="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800"
  >
    <div class="text-center">
      <h1 class="text-6xl font-bold text-blue-600">404</h1>
      <p class="text-xl mt-4">
        Oops! The page you’re looking for doesn’t exist.
      </p>
      <p class="text-md text-gray-600 mt-2">
        You may have mistyped the address or the page may have moved.
      </p>
    </div>
    <router-link to="/" class="mt-6">
      <button
        class="px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-lg focus:outline-none"
      >
        Go Back Home
      </button>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "NotFoundPage",
};
</script>
