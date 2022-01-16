#!/usr/bin/env bash
rm -rf ./generated;
mkdir generated;
sizes=(96 128 192 256 384 512);
for f in *.svg; do
    for size in "${sizes[@]}"; do
        inkscape "$f" -w "${size}" -h "${size}" -o "generated/${f%.svg}${size}.png";
    done;
    cp "$f" "./generated/$f";
done;
magick -background none icon.svg -resize 256x256 generated/favicon.ico;