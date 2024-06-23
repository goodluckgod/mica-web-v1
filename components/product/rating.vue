<template>
  <div class="average-rating flex items-center gap-1.5">
    <span class="text-sm font-light text-gray-500">{{
      rating.toFixed(1)
    }}</span>
    <span class="stars">
      <svg
        v-for="star in 5"
        :key="star"
        height="16"
        width="16"
        viewBox="0 0 47.94 47.94"
        class="star"
      >
        <defs>
          <linearGradient :id="`grad-${star}`">
            <stop offset="50%" stop-color="#FFD700" />
            <stop offset="50%" stop-color="#D3D3D3" />
          </linearGradient>
        </defs>
        <path
          :fill="getStarFill(star)"
          d="M26.285,2.486l5.407,10.956c0.376,0.762,1.103,1.29,1.944,1.412l12.091,1.757
	c2.118,0.308,2.963,2.91,1.431,4.403l-8.749,8.528c-0.608,0.593-0.886,1.448-0.742,2.285l2.065,12.042
	c0.362,2.109-1.852,3.717-3.746,2.722l-10.814-5.685c-0.752-0.395-1.651-0.395-2.403,0l-10.814,5.685
	c-1.894,0.996-4.108-0.613-3.746-2.722l2.065-12.042c0.144-0.837-0.134-1.692-0.742-2.285l-8.749-8.528
	c-1.532-1.494-0.687-4.096,1.431-4.403l12.091-1.757c0.841-0.122,1.568-0.65,1.944-1.412l5.407-10.956
	C22.602,0.567,25.338,0.567,26.285,2.486z"
        />
      </svg>
    </span>
  </div>
</template>

<script>
export default {
  props: ["rating"],
  methods: {
    getStarFill(star) {
      if (star <= this.rating) {
        return "#FFD700"; // Full star color
      } else if (star - 0.5 <= this.rating) {
        return `url(#grad-${star})`; // Half star gradient
      } else {
        return "#D3D3D3"; // Empty star color
      }
    },
  },
};
</script>

<style scoped>
.average-rating {
  display: flex;
  align-items: center;
}

.stars {
  display: flex;
}

.star {
  margin-right: 2px;
}

.rating-text {
  margin-left: 8px;
  font-size: 1.2em;
}
</style>
