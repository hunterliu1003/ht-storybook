<template lang="pug">
  v-container
    v-layout(row wrap)
      v-flex(xs12 sm10 md8 offset-sm1 offset-md2)
        v-card.info
          v-container(fluid)
            v-layout(row)
              v-flex(xs5 sm4 md3)
                v-card-media(
                  src="https://media.timeout.com/images/103444978/630/472/image.jpg"
                  height="130px"
                )
              v-flex(xs7 sm8 md9)
                v-card-title(primary-title)
                  div
                    h5.white--text.headline My Meetup
                    div 17th July 2017
                v-card-actions
                  v-btn(flat to="/meetups/1")
                    v-icon(left light) arrow_forward
                    | View Meetup

</template>