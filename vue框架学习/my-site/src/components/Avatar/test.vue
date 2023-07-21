<template>
    <div>
      <Avatar
        src="https://img1.baidu.com/it/u=3302184040,3713353210&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1689958800&t=c5544548483d80e372afb5e9f2ecfefc"
      ></Avatar>
      <Avatar
        src="https://img1.baidu.com/it/u=3129770633,3933811923&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1689958800&t=5163b0c7f3e36c0fcab5c0e77d5493ab"
        :size="100"
      ></Avatar>
    </div>
  </template>
  
  <script>
  import Avatar from "@/components/Avatar/";
  export default {
    name: "App",
    components: {
      Avatar,
    },
  };
  </script>
  
  <style>
  </style>