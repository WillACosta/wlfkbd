# Bill of materials

The quantities below cover both keyboard halves. Each half has 20 keys. The production BOM is the source for the SMD component values and LCSC part numbers.

## Order separately

| Part | Quantity | Notes |
| --- | ---: | --- |
| 3.7 V LiPo batteries | 2 | Maximum 6 × 25 × 55 mm (602555); battery not included with PCB assembly |
| MX switches | 40 | One per key |
| Keycaps | 40 | One per key |
| Case sets | 2 | Top case, bottom plate, diffuser and switch cap per half |
| Bottom-plate screws and anti-slip pads | 2 sets | Match the case hardware |

## PCB components (assembled by JLCPCB)

| Component | Quantity | Value / LCSC part number |
| --- | ---: | --- |
| XIAO nRF52840 | 2 | C17209540 |
| MX-compatible hot-swap sockets | 40 | KS-33B / C49352235 |
| 1N4148W diodes | 40 | SOD-123 / C2099 |
| Reset buttons | 2 | C115351 |
| Power slide switches | 2 | C778186 |
| JST-GH 2-pin battery connectors | 2 | SMT connector |
| Capacitors | 4 | 10 µF, 10 V / C19702 |
| Capacitors | 4 | 100 nF, 50 V / C1591 |
| Backlight LEDs | 40 | MHT151WDT / C401114 |
| Backlight current-limit resistors | 40 | 1 kΩ / C21190 |
| Backlight MOSFETs | 2 | AO3400A / C20917 |
| Backlight gate resistors | 2 | 100 Ω / C22775 |
| Backlight gate pull-down resistors | 2 | 10 kΩ / C25804 |
| Status LEDs | 8 | SK6812MINI-E / C5149201 |
| Status LED MOSFETs | 2 | AO3407A / C5179536 |
| Status LED gate resistors | 2 | 100 Ω / C22775 |
| Status LED gate pull-up resistors | 2 | 100 kΩ / C25803 |
| Status LED data resistors | 2 | 330 Ω / C23138 |

The SMD parts above are present in the production BOM and intended for the assembled-PCB order. The mechanical MX switches, keycaps, batteries, case parts, screws and pads are separate purchases. Order one panel containing the left and right PCB halves for one keyboard. The backlight and status LEDs are PCB features; leave them assembled even if you do not plan to enable the lighting in firmware.
