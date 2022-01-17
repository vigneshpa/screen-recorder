#!/usr/bin/env bash
rm -rf ../public/icons;
mkdir ../public/icons;
sizes=(96 128 192 256 384 512);
for f in *.svg; do
    for size in "${sizes[@]}"; do
        inkscape "$f" -w "${size}" -h "${size}" -o "../public/icons/${f%.svg}${size}.png";
    done;
    cp "$f" "../public/icons/$f";
done;
magick -background none icon.svg -resize 256x256 ../public/favicon.ico;