# The Wolf ZMK firmware

This is the self-contained ZMK configuration for the **WᛝLF / The Wolf** split keyboard. It targets the Seeed Studio XIAO nRF52840 (`xiao_ble`) fitted to each non-reversible half.

## Included in this first firmware revision

- Wireless BLE split: the left half is the central and the right half is the peripheral.
- Battery reporting for both LiPo-powered halves through ZMK's XIAO BLE board battery-voltage-divider support.
- The 40-key, 6-column × 4-row electrical matrix, including the missing outer-pinky bottom key and three thumb keys per half.
- A four-layer QWERTY keymap: Base, Navigation, Symbols, Numbers, plus a Settings layer reached from the Nav/Symbol thumb key.
- Bluetooth profile selection/clear, a bootloader key on each outside key of Settings, NKRO, sleep, and short matrix debounce.
- Single-zone white backlight support. D10/P1.14 PWM drives the AO3400A low-side MOSFET; use Settings `BL_TOG`, `BL_INC`, and `BL_DEC`.

The three SK6812 status LEDs on each half are intentionally not enabled yet. Their data/enable nets are present in the PCB but their proposed connection, battery, and layer semantics are a separate firmware feature. Leaving them inactive preserves the low-power core keyboard behavior.

## Hardware mapping

The schematics define the same matrix mapping on both halves:

| Signal | XIAO pin |
| --- | --- |
| ROW0–ROW3 | D0–D3 |
| COL0–COL5 | D4–D9 |
| White backlight PWM | D10 / P1.14 |
| Status LED data / enable | NFC1 / NFC2 (reserved) |

The diode orientation is configured as `col2row`. The right-hand transform has a six-column offset and reverses its columns so every layer follows the physical order from the left outer edge to the right outer edge.

## Build

The recommended build route is GitHub Actions. Push this repository to GitHub; the repository-level **Build The Wolf firmware** workflow builds the three entries in [`build.yaml`](build.yaml): `wlf_left`, `wlf_right`, and `wlf_settings_reset`. Download the `wlf-firmware` workflow artifact and unzip it after the build completes.

For a local build, run the following from the repository root to initialize the configuration as a ZMK workspace, then build the two shields with the `xiao_ble` board. The required ZMK manifest is [`config/west.yml`](config/west.yml); its ZMK revision is `main`.

```sh
west init -l firmware/config
west update
west zephyr-export
west build -s zmk/app -d build/wlf-left -b xiao_ble -- -DSHIELD=wlf_left -DZMK_CONFIG="$PWD/firmware/config" -DZMK_EXTRA_MODULES="$PWD"
west build -s zmk/app -d build/wlf-right -b xiao_ble -- -DSHIELD=wlf_right -DZMK_CONFIG="$PWD/firmware/config" -DZMK_EXTRA_MODULES="$PWD"
```

## Flashing

1. Turn each half off, connect it by USB-C, and press its reset button twice quickly. The XIAO should mount as a UF2 bootloader drive.
2. Copy `wlf_left.uf2` to the left half and `wlf_right.uf2` to the right half. The drive disconnecting after the copy is expected.
3. Disconnect USB, turn both halves on, and press reset once on each half so they start a fresh wireless-split connection.
4. Pair from the left half. The Settings layer includes `BT_CLR` and five Bluetooth profile selectors if a host pairing needs to be replaced.

If split pairing state becomes stale during development, flash `wlf_settings_reset.uf2` to **both** halves, then immediately reflash the normal left and right images. This erases stored ZMK settings, including Bluetooth pairings.

The physical reset buttons remain the recovery method even if the keymap is customized. The Settings layer also exposes `&bootloader` at its two outside positions for normal software entry into the UF2 bootloader.

## Customizing

Edit [`config/wlf.keymap`](config/wlf.keymap) for bindings and [`config/wlf.conf`](config/wlf.conf) for feature settings. The shield definition is under [`boards/shields/wlf`](boards/shields/wlf). Keep the D0–D10 assignments unchanged unless the PCB is revised.

For the underlying integration patterns, see ZMK's [custom shield guide](https://zmk.dev/docs/hardware-integration/new-shield), [battery sensing guide](https://zmk.dev/docs/hardware-integration/battery), and [backlight integration guide](https://zmk.dev/docs/hardware-integration/lighting/backlight).
