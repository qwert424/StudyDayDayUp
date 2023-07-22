<template>
    <div>
      <Contact type="github" text="Fangdaochu"></Contact>
      <Contact type="mail" text="fangdaochu@gmail.com"></Contact>
      <Contact type="qq" text="296840095"></Contact>
      <Contact type="weixin" text="yhssjsjj"></Contact>
    </div>
  </template>
  
  <script>
  import Contact from "@/components/Contact";
  export default {
    components: {
      Contact,
    },
  };
  </script>
  
  <style>
  div {
    width: 200px;
    background: black ;
  }
  </style>