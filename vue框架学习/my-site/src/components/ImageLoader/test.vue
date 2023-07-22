<template>
    <ImageLoader :src="fallUrl" :placeholder="fallsUrl" />
  </template>
  
  <script>
  import fallUrl from "@/assets/fall-autumn-red-season.jpg";
  import fallsUrl from "@/assets/fall-autumn-red-season-s.jpg";
  import ImageLoader from "@/components/ImageLoader/";
  export default {
    components: {
      ImageLoader,
    },
    data() {
      return {
        fallUrl,
        fallsUrl,
      };
    },
  };
  </script>
  
  <style>
  </style>