<template>
  <div  class="v-alert-right" >
    <v-alert
    outlined
    border="left"
    type="error"
    class="v-bg-white"
    >
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas alias consequuntur quaerat ipsum beatae. Dolore et consequatur ipsa, minima minus suscipit rem assumenda illo in inventore eveniet fugit quidem aliquam mollitia, nulla, reiciendis fugiat saepe? Similique aperiam pariatur laborum debitis atque quia! Adipisci consectetur delectus totam fugiat. Harum eaque totam neque labore in facere fugit ut veritatis minus dolores ipsa aliquid laudantium aspernatur eius autem enim temporibus possimus porro, eos modi magni repellat commodi. Facere non, dolore quam reiciendis soluta ut quia sint? Magnam quod commodi quo distinctio, beatae ipsam voluptatum quidem exercitationem tempore modi eius quam corrupti laborum harum?      
    </v-alert>
  </div>
</template>

<style scoped>
.v-bg-white {
  background-color: #fff !important;
}
.v-alert-right {
  max-width: 40%;
  position: fixed;
  right: 20px;
  bottom: 10px;
  z-index: 9;
}

@media (max-width: 768px) {
  .v-alert-right {
    max-width: 70%;
  }
}
</style>