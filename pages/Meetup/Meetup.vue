<template lang="pug">
  v-container
    v-layout(row wrap)
      v-flex(xs12)
        v-card
          v-card-title
            h4.primary--text.headline My Meetup
          v-card-media(
            src="https://media.timeout.com/images/103444978/630/472/image.jpg"
            height="400px"
          )
          v-card-text
            div.info--text 17th July 2017 - Wher it takes place
            div Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
          v-card-actions
            v-spacer
            v-btn.primary Register
</template>
