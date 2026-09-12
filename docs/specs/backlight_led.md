# Wlf Keyboard — White Backlight System

## Overview

Wlf uses a **single-zone white LED backlight** inspired by Apple's Magic Keyboard and MacBook keyboards. The objective is to provide a subtle, elegant, and battery-efficient backlight while keeping the hardware simple, inexpensive, and easy to manufacture using JLCPCB SMT Assembly.

- White-only backlight
- Single lighting zone
- PWM-controlled AO3400A MOSFET
- One resistor per LED
- LEDs powered directly from the battery (`VBAT`)
- Dedicated `LED_VCC` power rail
- 10uF + 100nF local decoupling
- No LED driver
- Fully compatible with ZMK
- Optimized for wireless battery-powered operation
- Easy to manufacture with JLCPCB SMT Assembly

This design closely follows the philosophy used in premium commercial keyboards: minimal hardware complexity, excellent battery life, and a clean, understated lighting experience.

The entire backlight is controlled as a **single lighting zone**, allowing global brightness adjustment through PWM without requiring a dedicated LED driver.

### Why No LED Driver?

Wlf Rev. A intentionally avoids dedicated LED driver ICs (IS31FL37xx family).

Instead, all LEDs are switched simultaneously using a single PWM-controlled MOSFET.

#### Advantages

- Only one GPIO required
- Very small BOM
- Extremely simple schematic
- Easy PCB routing
- Excellent battery life
- Minimal firmware complexity
- Fully supported by ZMK PWM

#### Trade-offs

Supported:

- ✅ Backlight ON/OFF
- ✅ Global brightness control
- ✅ PWM dimming
- ✅ Fade in / Fade out
- ✅ Auto-off after inactivity

Not supported:

- ❌ Per-key brightness
- ❌ Reactive typing
- ❌ Ripple animations
- ❌ RGB effects
- ❌ Multiple lighting zones
