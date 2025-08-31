# Komponentdokumentasjon – Roadmap Frontend

## AppList
- Viser alle apper fra backend
- Bruker DS `<Spinner>` og `<Alert>` for loading/error
- Props: ingen
- API: `useGetAppsQuery`

## FeatureList
- Viser features for valgt app
- Bruker DS `<Spinner>`, `<Alert>`, `<Tag>`
- Props: `appId`
- API: `useGetFeaturesQuery`

## FeatureDetails
- Viser detaljert info om feature
- Inkluderer status, stemmer, kommentarer
- Bruker DS-komponenter for visning
- Props: `featureId`
- API: `useGetFeaturesQuery`, `useGetStatusesQuery`, `useGetCommentsQuery`

## NewFeatureForm
- Skjema for oppretting/redigering av feature
- Bruker DS `<Textfield>`, `<Select>`, `<Checkbox>`, `<Button>`, `<Alert>`
- Props: `appId`, `statusId`, `initial*`-props, `featureId`, `onCancel`, `onSaved`
- API: `useAddFeatureMutation`, `useUpdateFeatureMutation`

## VersionAdmin
- Admin for versjoner/status
- CRUD for status
- Bruker DS `<Button>`, `<Textfield>`, `<Alert>`, `<Tag>`
- Props: `appId`
- API: `useGetStatusesQuery`, `useAddStatusMutation`, `useUpdateStatusMutation`, `useDeleteStatusMutation`

## RoadmapWithVersions
- Roadmap med grouping og hierarki
- Viser features per status, med sub-features
- Bruker DS `<Tag>`, `<Button>`, `<Select>`, `<Alert>`
- Props: `appId`, `statusId`
- API: `useGetFeaturesQuery`, `useGetStatusesQuery`, `useUpdateFeatureStatusMutation`, `useDeleteFeatureMutation`, `useUpdateFeatureMutation`

## Tabs
- Custom/DS tabs for admin
- Props: `tabs`, `activeTab`, `onTabChange`

## VoteButton
- Stemmeknapp med optimistisk UI
- Bruker DS `<Button>`
- Props: `featureId`, `votes`, `onVote`
- API: `useAddVoteMutation`, `useDeleteVoteMutation`

## CommentList / AddComment
- Viser og oppretter kommentarer til feature
- Bruker DS `<Textfield>`, `<Button>`, `<Alert>`
- Props: `featureId`
- API: `useGetCommentsQuery`, `useAddCommentMutation`, `useUpdateCommentMutation`, `useDeleteCommentMutation`

---
Se README.md for oversikt over flows og mappestruktur.
