# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

### Changed
- Migrated Telegram notification hook from shell script (`.sh`) to TypeScript (`.ts`) using Bun for better reliability and maintenance.
- Updated `.gemini/settings.json` to use the new TypeScript hook and increased timeout to 10 seconds.

### Removed
- Deleted `.gemini/hooks/telegram-notify.sh`.
