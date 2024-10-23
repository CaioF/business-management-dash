#!/usr/bin/env sh

find . -type f \( -iname "*.hurl" \) | xargs hurl --test --variable host=back --variable port=3001