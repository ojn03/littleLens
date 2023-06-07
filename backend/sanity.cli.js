import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: REACT_APP_SANITY_PID,
    dataset: 'production'
  }
})
