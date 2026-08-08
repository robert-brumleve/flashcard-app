# Flashcard App Architecture

## Project Vision

This application is designed primarily as an offline Android flashcard app for learning English from Japanese.

The primary goals are:

- Simple to use for the student.
- Easy for a parent to author and maintain decks.
- Fully functional offline.
- Portable between devices.
- Built to evolve over time.

The application separates:

- Educational content
- Study progress
- Application logic

Each is stored independently.

---

# Core Principles

## Offline First

Studying should never require an internet connection.

Internet access is only used for optional authoring features such as:

- AI translation
- AI example sentences
- AI image generation

---

## Decks are Content

Decks are educational content.

They are stored as JSON files with associated assets.

Decks should be:

- Human readable
- Easy to back up
- Easy to import/export
- Independent of study progress

---

## Progress is Personal

Study progress belongs to users.

It is stored separately in SQLite.

Deleting or replacing a deck should not affect another user's progress unless the deck IDs change.

---

## Stable IDs

Every deck and every card has a permanent ID.

IDs should never change simply because:

- a card is renamed
- a deck is reorganized
- textbook information changes

IDs are internal.

Users never edit them directly.

---

## Authoring Experiences

PC
Full deck creation
Bulk importing images
Add many cards
Drag & drop media
Organize assets

Tablet Parent Mode
Quick corrections
Fix typos
Change translations
Replace a single image
Reorder a few cards

---

# Folder Structure

decks/

    manifest.json

    textbook/

        lets-go/

            LG1/

                assets/

                    images/

                    audio/

                JP-EN_vocab/

                    deck.json

                EN-JP_vocab/

                    deck.json

                Sentences/

                    deck.json

                Listening/

                    deck.json

src/

public/

...

---

# Data Model

## Deck

Contains:

- metadata
- cards

Does NOT contain:

- study progress

---

Deck metadata includes:

- id
- name
- version
- category
- series
- book
- tags

---

## Card

Contains:

- id
- order
- type
- front
- back
- accepted answers (optional)

Cards do not know anything about scheduling.

---

## Side

A side may contain:

- text
- zero or more images
- zero or more audio files

Images and audio are stored as filenames only.

The application resolves file locations.

---

## User

Represents one learner.

Each user has independent progress.

---

## Progress

Stored in SQLite.

Tracks:

- interval
- ease
- next review
- review count

Progress is linked by:

- user ID
- deck ID
- card ID

---

# Media

Assets are stored once per textbook.

Example:

LG1/

    assets/

        images/

        audio/

All decks inside LG1 share those assets.

Cards reference filenames only.

Example:

dog.jpg

NOT

assets/images/dog.jpg

---

# Speaking Cards

Speaking cards use Android speech recognition.

The recognized text is normalized before comparison.

Speaking flow:

Speak

↓

Normalize

↓

Compare

↓

Correct?

↓

Retry once if incorrect

↓

Scheduler grade

Timing thresholds are configurable per card.

---

# Parent Mode

Protected by PIN.

Allows:

- deck editing
- card creation
- importing
- exporting
- AI generation

Students never enter Parent Mode.

---

# Student Mode

Students only:

- choose profile
- study
- review progress
- change personal settings

They cannot modify decks.

---

# AI

AI is optional.

It assists with:

- translations
- example sentences
- image generation

AI is never required for studying.

Every AI request that incurs cost requires confirmation.

---

# Roadmap

Milestone 1

✓ Load decks
✓ Display cards
✓ Navigation

Milestone 2

✓ Study screen

Milestone 3

✓ Scheduler
✓ Users
✓ Progress

Milestone 4

Deck editor
SQLite

Milestone 5

Android
Speech recognition

Milestone 6

AI features

---

# Future Ideas

Not part of Version 1.

Possible future additions:

- MediaResolver
- Learning suggestions
- Statistics
- Deck importing/exporting
- Cloud synchronization
- Multiple textbook series

# Design Decisions

## DD-001

Decks are stored as JSON rather than SQLite.

Reason:

Decks are educational content, not application state.

JSON is easier to edit, version, import, export and back up.

Date:

2026-06-30

---

## DD-002

Assets are stored once per textbook.

Reason:

Avoid duplicated images and audio across decks.

Date:

2026-06-30

---

## DD-003

Cards use stable IDs independent of textbook organization.

Reason:

Changing textbook metadata should never reset user progress.

Date:

2026-06-30

# Deferred Decisions

## Manifest Initialization

For Version 1, manifest.json is assumed to exist and be valid.

A future initializeManifest() function may:

create the manifest if it doesn't exist,
populate it using findDeckFiles(),
synchronize newly added decks,
preserve enabled/disabled state.