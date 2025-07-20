---
layout: page
---

<script setup>
import {
  VPTeamPage,
  VPTeamPageTitle,
  VPTeamMembers,
  VPTeamPageSection
} from 'vitepress/theme'

const contributers = [
  {
    avatar: 'https://avatars.githubusercontent.com/u/3267000?v=4',
    name: 'Ryan T. M. Reiffenberger',
    title: 'Creator',
    links: [
      { icon: 'github', link: 'https://github.com/ReclaimerGold' }
    ]
  },
  {
    avatar: 'https://avatars.githubusercontent.com/u/34190203?v=4',
    name: 'Jacob Banghart',
    title: 'Collaborator',
    links: [
      { icon: 'github', link: 'https://github.com/JacobBanghart' }
    ]
  }
]

const collaborators = [
  {
    avatar: 'https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png',
    name: 'Ty Hald',
    title: 'Collaborator'
  }
]
</script>

<VPTeamPage>
  <VPTeamPageTitle>
    <template #title>Main Contributers</template>
    <template #lead>These are the members that have contributed either code, articles, or editing services to the resource codex contained within this site.</template>
  </VPTeamPageTitle>
  <VPTeamMembers size="medium" :members="contributers" />
  <VPTeamPageSection>
    <template #title>Collaborators</template>
    <template #lead>A special recognition is extended to collaborators who have utilized our guides or have worked with us to improve the quality of the resources within this site.</template>
    <template #members>
      <VPTeamMembers size="small" :members="collaborators" />
    </template>
  </VPTeamPageSection>
</VPTeamPage>