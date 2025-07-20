# Bug Reproduction Steps

This repository contains a minimal reproduction of a bug in LiveStore related to optional schema fields when no default value is provided.

## Setup

1. Install dependencies:
```bash
pnpm install
```

2. Start the development server:
```bash
pnpm dev
```

3. Run the tests to see the bug:
```bash
vitest
```

## Bug Description

The bug occurs when using `Schema.optional()` fields in client documents. If an optional field doesn't have a default value in the document's default configuration, if you try to access it after setting, it returns "undefined".

## Test Results

When you run `vitest`, you should see:

- ✅ **Test 1 passes**: "successfully sets a property with default text field set" - Works because `description` has a default value
- ❌ **Test 2 fails**: "errors when optional property has no default text field set" - Fails because `description` has no default value
- ✅ **Test 3 passes**: "success when trying to set the optional field second time" - Shows the field can be set if second attempt was made

## Key Files

- `schema.ts` - Contains the schema definitions showing the difference between `uiState` (with default) and `uiStateNotSet` (without default)
- `setState.test.ts` - Contains the failing test cases that demonstrate the bug

## Expected vs Actual Behavior

**Expected**: Optional fields should work consistently whether or not they have default values specified.

**Actual**: Optional fields without default values cause errors when queried, even after being set via events.
