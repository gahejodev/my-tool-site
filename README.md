# ZEEROZ AI STUDIO

Standalone source repository for the Zeeroz lesson video creator.

## Public application
https://gahejodev.github.io/zeeroz-ai-studio/

## Academy integration
- Firebase Authentication: existing Zeeroz Academy Firebase project.
- Access control: Firebase custom claim `admin: true`.
- Course registry and lesson packages: read from the Zeeroz Academy public course library.
- The Academy remains independent; this Studio is deployed as a separate application.

## Included
- Course, chapter and lesson picker
- Storyboard and narration editor
- Interactive procedural 3D Biology scenes
- Browser-based Urdu Piper neural voice
- 3D avatar lip-sync preview
- WebM video export

## Honest capability notes
The avatar currently uses an open-source face/shoulders character, not a custom full-body Zeeroz teacher. Biology models are a procedural pilot, not a general-purpose automatic 3D animation generator. Urdu neural voice is integrated; a verified local Sindhi neural voice model is not yet included. MP4 conversion and direct YouTube publishing are not included.

## Security
Firebase browser configuration is public by design. Admin authorization relies on Firebase Authentication custom claims and must also be enforced by Firebase security rules. Never commit service-account keys, private API tokens, or passwords.
