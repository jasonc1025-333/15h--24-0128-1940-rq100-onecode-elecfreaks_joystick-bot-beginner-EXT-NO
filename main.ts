/**
 * From: 15h--24-0128-1950-RQ100-OneCode-Elecfreaks_Joystick-Bot-Intermediate-ACMb-TYJ-2DigitChEdit-Simplify
 */
/**
 * * Key Notes: Bot (Network: Server)
 * 
 * * DfRobot Driver Expansion Board
 * 
 * ** https://wiki.dfrobot.com/Micro_bit_Driver_Expansion_Board_SKU_DFR0548
 * 
 * ** https://github.com/DFRobot/pxt-motor
 * 
 * * Micro-Servo 9G A0090 (Sparkfun)
 * 
 * ** ~ HiTec HS-55
 * 
 * ** MicroBit: 'servo set pulse pin Px (e.g. P8) to (us) ___'  :)+
 * 
 * * To prevent flooding this bot-server with messages, have controller-client delay approx. 20ms to still maintain real-time response after each send-tx.
 * 
 * * Also, 1 Char Msg Max, 2 Char or more caused buffer-overrun and serial broke down, froze
 * 
 * * on event AB not work, but A or B does work reliably
 * 
 * * also 'on button A', 'on button B', and 'on button A+B' do work without 'on event' blocks present: event triggers only on ButtonEvtUp reliably
 * 
 * ** Also if held down longer than 2 sec, event will be aborted
 * 
 * * Thus, avoid condition: 'button A/B/A+B is pressed' block since not reliable
 */
/**
 * // jwc o let network_GroupChannel_MyBotAndController_Base0_Int = 0
 */
// * Key Notes: Controller-Joystick (Network-Client)
// 
// * Yahboom Joystick
// 
// ** https://www.yahboom.net/study/SGH
// 
// ** https://github.com/lzty634158/GHBit
// 
// * DfRobot Driver Expansion Board
// 
// ** https://wiki.dfrobot.com/Micro_bit_Driver_Expansion_Board_SKU_DFR0548
// 
// ** https://github.com/DFRobot/pxt-motor
function setup_Network_Fn () {
    if (true) {
        _codeComment_AsText = "Network"
        if (true) {
            if (true) {
                network_Throttle_MilliSec_Per_CpuCycle_Start = 0
                network_Throttle_MilliSec_Per_CpuCycle_End = 0
                network_Throttle_MilliSec_Per_CpuCycle_Duration = 0
                network_Throttle_Controller_DelayPerCpuCycle_Int = 0
            }
        }
        if (true) {
            device_Mode_Edit_Bool = false
            radio.setGroup(network_GroupChannel_MyBotAndController_Base0_Int)
            basic.showString("CH:" + network_GroupChannel_MyBotAndController_Base0_Int)
        }
    }
}
function convert_Controller_Joystick__Cartesian_To_Polar__AngleDegree_AsIncremented_Int_Func (cartesian_side_adjacent_x_int_in: number, cartesian_side_opposite_y_int_in: number, angle_degrees_incremented_in: number) {
    serial.writeString("> Convert::" + " Side_Adjacent: " + quest_General.quest_Get_Number_WithColumnPadding_AsStringOut_Fn(
    cartesian_side_adjacent_x_int_in,
    5,
    0
    ) + " Side_Opposite: " + quest_General.quest_Get_Number_WithColumnPadding_AsStringOut_Fn(
    cartesian_side_opposite_y_int_in,
    5,
    0
    ))
    quest_Note_1.quest_Show_String_For_Note_Small_Fn(
    "Convert to radians"
    )
    _local_converted_value_int_out = Math.atan2(cartesian_side_opposite_y_int_in, cartesian_side_adjacent_x_int_in)
    serial.writeString(" Angle:: Radians: " + quest_General.quest_Get_Number_WithColumnPadding_AsStringOut_Fn(
    _local_converted_value_int_out,
    10,
    4
    ))
    quest_Note_1.quest_Show_String_For_Note_Small_Fn(
    "Convert to degrees"
    )
    _local_converted_value_int_out = _local_converted_value_int_out * (180 / 3.1416)
    if (_local_converted_value_int_out < 0) {
        quest_Note_1.quest_Show_String_For_Note_Small_Fn(
        "If < 0, then keep > 0"
        )
        _local_converted_value_int_out = _local_converted_value_int_out + 360
    }
    serial.writeString(" Degrees:: Raw: " + quest_General.quest_Get_Number_WithColumnPadding_AsStringOut_Fn(
    _local_converted_value_int_out,
    5,
    1
    ))
    quest_Note_1.quest_Show_String_For_Note_Small_Fn(
    "Convert to degrees as incremented by passed_in_argument"
    )
    _local_converted_value_int_out = Math.idiv(_local_converted_value_int_out, angle_degrees_incremented_in) + Math.round(_local_converted_value_int_out % angle_degrees_incremented_in / angle_degrees_incremented_in)
    serial.writeString(" Incremented: " + quest_General.quest_Get_Number_WithColumnPadding_AsStringOut_Fn(
    _local_converted_value_int_out,
    5,
    1
    ) + " * " + angle_degrees_incremented_in)
    _local_converted_value_int_out = _local_converted_value_int_out * angle_degrees_incremented_in
    serial.writeString(" = " + quest_General.quest_Get_Number_WithColumnPadding_AsStringOut_Fn(
    _local_converted_value_int_out,
    5,
    1
    ))
    if (false) {
        serial.writeNumbers([Math.atan2(1, 1), Math.atan2(1.732, 1), Math.atan2(1, 1.732)])
    }
    return _local_converted_value_int_out
}
function convert_Controller_Joystick__Cartesian_To_Polar__AngleDegree_Int_Func_OLD (cartesian_side_adjacent_x_int_in: number, cartesian_side_opposite_y_int_in: number) {
    serial.writeString("> Convert::" + " Side_Adjacent: " + quest_General.quest_Get_Number_WithColumnPadding_AsStringOut_Fn(
    cartesian_side_adjacent_x_int_in,
    5,
    0
    ) + " Side_Opposite: " + quest_General.quest_Get_Number_WithColumnPadding_AsStringOut_Fn(
    cartesian_side_opposite_y_int_in,
    5,
    0
    ))
    quest_Note_1.quest_Show_String_For_Note_Small_Fn(
    "Convert to radians"
    )
    _local_converted_value_int_out = Math.atan2(cartesian_side_opposite_y_int_in, cartesian_side_adjacent_x_int_in)
    serial.writeString(" Angle:: Radians: " + quest_General.quest_Get_Number_WithColumnPadding_AsStringOut_Fn(
    _local_converted_value_int_out,
    10,
    4
    ))
    quest_Note_1.quest_Show_String_For_Note_Small_Fn(
    "Convert to degrees and round to nearest tenth decimal"
    )
    _local_converted_value_int_out = _local_converted_value_int_out * (180 / 3.1416)
    if (_local_converted_value_int_out < 0) {
        quest_Note_1.quest_Show_String_For_Note_Small_Fn(
        "If < 0, then keep > 0"
        )
        _local_converted_value_int_out = _local_converted_value_int_out + 360
    }
    serial.writeString(" Degrees: " + quest_General.quest_Get_Number_WithColumnPadding_AsStringOut_Fn(
    _local_converted_value_int_out,
    5,
    1
    ))
    if (false) {
        serial.writeNumbers([Math.atan2(1, 1), Math.atan2(1.732, 1), Math.atan2(1, 1.732)])
    }
    return _local_converted_value_int_out
}
function screen_Clear_Func () {
    for (let index_X = 0; index_X <= 4; index_X++) {
        for (let index_Y = 0; index_Y <= 4; index_Y++) {
            led.unplot(index_X, index_Y)
        }
    }
}
function setup_BotOnly_Fn () {
    if (device_Type_Bot_Bool) {
        quest_Note_1.quest_Show_String_For_Note_Big_Fn(
        "Was 75/100"
        )
        motor_Power_Gear_01_MAX = 30
        motor_Power_Gear_02_MAX = 60
        motor_Power_ZERO_INT = 0
    }
    if (true) {
        motor_Power_Full_Current_Pos = motor_Power_Gear_01_MAX
        motor_Power_Full_Current_Neg = -1 * motor_Power_Full_Current_Pos
        motor_Power_Half_Current = Math.round(0.5 * motor_Power_Full_Current_Pos)
    }
}
input.onButtonPressed(Button.A, function () {
    if (device_Mode_Edit_Bool) {
        network_GroupChannel_MyBotAndController_Base0__Digit_Tens__Int += 1
        if (network_GroupChannel_MyBotAndController_Base0__Digit_Tens__Int > 9) {
            network_GroupChannel_MyBotAndController_Base0__Digit_Tens__Int = 1
        }
    }
})
// * General Notes
// 
// * 2019-0519-0340
// 
// ** DFRobot Driver Expansion Board
// 
// * 2019-0525-09-HAA TYJ first complete joystick XY
// 
// * Technical Notes
// 
// * 2019-1019
// 
// ** Create more responsiveness, no DeadZone
// 
// * 2020-0120: 844 SW error : GC allocation failed for requested number bytes: GC (garbage collection) error of 57 variables max,
// 
// ** Delete 'index_y2' (tried to reuse but '844' error)
// 
// ** Tried to reuse 'item' but probably is a system var
// 
// ** Remove unused 'button_AandB_Countdown_CpuCycles', 'buttonA_Then_B_On'
// 
// ** Rename used-only-once-via-set:
// 
// *** 'dashboardDisplay_Brightness_HI' to 'servo_Pan_Degrees' :)+
// 
// *** 'groupChannel_Digit_MIN' to 'servo_Pan_Degrees'
// 
// *** 'groupChannel_Digit_MAX' to 'servo_Tilt_Degrees'
// 
// 
// 
// * 2020-0120-02: Arm Servo
// 
// ** S-bus not work (DFRobot driver), so switch to P-bus (MakeCode driver)
// 
// ** DfRobot only has P0, P1, P2 as Read/Write from MakeCode's Menu, so reserve for Read Only.  Rest for Write Only.
// 
// *** Ultrasonic Sensor: P0 (Read, Echo), P8 (Write, Trigger)
// 
// *** ServoArmRight: P12 (Write-Only)
// 
// *** PIxyCam: P13 (Write-Only) Pan Servo, P14 (Write-Only) Tilt Servo, P1 (Read) Dig In from PixyCam-P1, P2 (Read) Ana In from PIxyCam-P8, S8-Pwr, S8-Gnd
// 
// * 2020-0224-1215
// 
// ** Network Test w/ Gaming Server
// 
// *** w/ Sonar: Simulated or Real
// 
// *** w/ BotId: Random or Real
// 
// * 2020-0305
// 
// ** 844 Error 57,49 variable max issue: Consolidate 'index_X' 'index_Y' to 'index'
// 
// *** Delete obsolete 'joystick_Value'
// 
// * 2020-0328
// 
// ** DFRobot S1 not seem to work for Arm-Right, though worked before, go back to micro:bit P16
// 
// ** abandon usage of S1-S6 for now, not reliable, since not work before, yet TYJ P1-P16 does  :)+
// 
// * 2020-04xx
// 
// Micro-Servo 9G A0090 (Sparkfun)
// 
// ~ HiTec HS-55
// 
// MicroBit: 'servo set pulse pin Px (e.g. P8) to (us) ___'  :)+
// 
// 0 no
// 
// 250 0
// 
// 500 no
// 
// >> 750: 45
// 
// 1000 90 - 10 = 80
// 
// 1250 90 + 10 = 100
// 
// >> 1500 90 + 30
// 
// 1750 180 - 30
// 
// 2000 170
// 
// 2250 190
// 
// >> 2500 225 = 180 + 30/45
// 
// 2750 no
// 
// 3000 no
// 
// * Using DFRobot Servo Pins not reliable, possibly since these are 3.3.v servos (not standard 5.0v servos), thus use MicroBit 'servo write pin Pxx' blocks for reliable 0-180 degrees.
function setup_BotAndController_Fn () {
    if (true) {
        _codeComment_AsText = "Default: None, since require manual activation since all-in-one code shared between both devices"
        device_Type_Controller_Bool = false
        device_Type_Bot_Bool = false
    }
    if (true) {
        screenBrightness_HI_DEFAULT_INT = 255
        _codeComment_AsText = "127 not low enough, 15 is better, 1 too low, 7 seems best"
        screenBrightness_LO_INT = 7
    }
    if (true) {
        _debug_Serial_Print_Bool = false
    }
}
function ConvertNetworkMessage_ToOperateBot_PrintDebug_Fn (name_Str_In: string, value_Int_In: number, motor_Power_L_Neg100toPos100_Int_In: number, motor_Power_R_Neg100toPos100_Int_In: number) {
    serial.writeString(" > " + name_Str_In + " = " + quest_General.quest_Get_Number_WithColumnPadding_AsStringOut_Fn(
    value_Int_In,
    5,
    0
    ) + " || servo_motor_l:" + quest_General.quest_Get_Number_WithColumnPadding_AsStringOut_Fn(
    motor_Power_L_Neg100toPos100_Int_In,
    5,
    0
    ) + " | servo_motor_r:" + quest_General.quest_Get_Number_WithColumnPadding_AsStringOut_Fn(
    motor_Power_R_Neg100toPos100_Int_In,
    5,
    0
    ) + " <")
}
function convert_Controller_Joystick_AngleDegrees_ToMicrobit5x5Screen_Fn (angle_degree_int_in: number) {
    if (angle_degree_int_in == 90) {
        quest_Note_1.quest_Show_String_For_Note_Small_Fn(
        "tan is undefined (divide by 0)"
        )
        _local_new_x_int = 0
        _local_new_y_int = 2
        quest_Note_1.quest_Show_String_For_Note_Small_Fn(
        "Convert to '_local_grid__origin_at_center__x/y_int'"
        )
        _local_grid__origin_at_center__x_int = _local_new_x_int
        _local_grid__origin_at_center__y_int = _local_new_y_int
    } else if (angle_degree_int_in == -90 || angle_degree_int_in == 270) {
        quest_Note_1.quest_Show_String_For_Note_Small_Fn(
        "tan is undefined (divide by 0)"
        )
        _local_new_x_int = 0
        _local_new_y_int = -2
        quest_Note_1.quest_Show_String_For_Note_Small_Fn(
        "Convert to '_local_grid__origin_at_center__x/y_int'"
        )
        _local_grid__origin_at_center__x_int = _local_new_x_int
        _local_grid__origin_at_center__y_int = _local_new_y_int
    } else {
        if (true) {
            quest_Note_1.quest_Show_String_For_Note_Small_Fn(
            "tan is not undefined (not divide by 0)"
            )
            if (angle_degree_int_in >= 45 && angle_degree_int_in <= 135 || angle_degree_int_in >= 225 && angle_degree_int_in <= 315) {
                quest_Note_2.quest_Show_String_For_Note_Small_Fn(
                "Upper or Bottom Side of Grid"
                )
                quest_Note_1.quest_Show_String_For_Note_Small_Fn(
                "y=2, x:"
                )
                _local_new_x_int = 2 / Math.tan(angle_degree_int_in * (3.1416 / 180))
                _local_new_y_int = 2
                quest_Note_1.quest_Show_String_For_Note_Small_Fn(
                "Convert to '_local_grid__origin_at_center__x/y_int'"
                )
                _local_grid__origin_at_center__x_int = Math.round(_local_new_x_int)
                if (_local_grid__origin_at_center__x_int > 2) {
                    _local_grid__origin_at_center__x_int = 2
                }
                _local_grid__origin_at_center__y_int = _local_new_y_int
            } else {
                quest_Note_2.quest_Show_String_For_Note_Small_Fn(
                "Left or Right Side of Grid"
                )
                quest_Note_1.quest_Show_String_For_Note_Small_Fn(
                "x=2, y:"
                )
                _local_new_x_int = 2
                _local_new_y_int = 2 * Math.tan(angle_degree_int_in * (3.1416 / 180))
                quest_Note_1.quest_Show_String_For_Note_Small_Fn(
                "Convert to '_local_grid__origin_at_center__x/y_int'"
                )
                _local_grid__origin_at_center__x_int = _local_new_x_int
                _local_grid__origin_at_center__y_int = Math.round(_local_new_y_int)
                if (_local_grid__origin_at_center__y_int > 2) {
                    _local_grid__origin_at_center__y_int = 2
                }
            }
            if (true) {
                quest_Note_2.quest_Show_String_For_Note_Small_Fn(
                "Default as Quadrant I"
                )
                quest_Note_1.quest_Show_String_For_Note_Small_Fn(
                "Default to positive values regardless of sign of tan"
                )
                _local_grid__origin_at_center__x_int = Math.abs(_local_grid__origin_at_center__x_int)
                _local_grid__origin_at_center__y_int = Math.abs(_local_grid__origin_at_center__y_int)
            }
            if (angle_degree_int_in > 90 && angle_degree_int_in <= 180) {
                quest_Note_2.quest_Show_String_For_Note_Small_Fn(
                "Quadrant II"
                )
                quest_Note_1.quest_Show_String_For_Note_Small_Fn(
                "Exclusive at Lower Boundary (Quad I: Higher Priority) -&- Inclusive at Higher Boundary (Quad III: Lower Priority)"
                )
                _local_grid__origin_at_center__x_int = Math.abs(_local_grid__origin_at_center__x_int) * -1
            } else if (angle_degree_int_in > 180 && angle_degree_int_in < 270) {
                quest_Note_2.quest_Show_String_For_Note_Small_Fn(
                "Quadrant III"
                )
                quest_Note_1.quest_Show_String_For_Note_Small_Fn(
                "Exclusive at Lower Boundary (Quad II: Higher Priority) -&- Exclusive at Higher Boundary (Quad IV: Higher Priority)"
                )
                _local_grid__origin_at_center__x_int = Math.abs(_local_grid__origin_at_center__x_int) * -1
                _local_grid__origin_at_center__y_int = Math.abs(_local_grid__origin_at_center__y_int) * -1
            } else if (angle_degree_int_in >= 270 && angle_degree_int_in < 360) {
                quest_Note_2.quest_Show_String_For_Note_Small_Fn(
                "Quadrant IV"
                )
                quest_Note_1.quest_Show_String_For_Note_Small_Fn(
                "Inclusive at Lower Boundary (Quad III: Lower Priority) -&- Exclusive at Higher Boundary (Quad I: Higher Priority)"
                )
                _local_grid__origin_at_center__y_int = Math.abs(_local_grid__origin_at_center__y_int) * -1
            }
        }
    }
    if (true) {
        quest_Note_2.quest_Show_String_For_Note_Small_Fn(
        "Convert from 'origin_at_center' to 'origin_at_upper_left'"
        )
        _local_grid__origin_at_upper_left__x_int = _local_grid__origin_at_center__x_int + 2
        quest_Note_1.quest_Show_String_For_Note_Small_Fn(
        "Invert y for micro:bit grid"
        )
        _local_grid__origin_at_upper_left__y_int = _local_grid__origin_at_center__y_int * -1 + 2
        if (false) {
            _local_grid__origin_at_upper_left__y_int = _local_grid__origin_at_center__y_int + 2
            _local_grid__origin_at_upper_left__y_int = _local_grid__origin_at_upper_left__y_int * -1
        }
        if (false) {
            _local_grid__origin_at_upper_left__y_int = 4 - _local_grid__origin_at_center__y_int * -1
        }
        basic.clearScreen()
        led.plot(_local_grid__origin_at_upper_left__x_int, _local_grid__origin_at_upper_left__y_int)
    }
    quest_Note_1.quest_Show_String_For_Note_Small_Fn(
    " Grid5x5: x:  y:"
    )
    if (false) {
        serial.writeString(" || Grid:::" + " Angle:: Deg:" + quest_General.quest_Get_Number_WithColumnPadding_AsStringOut_Fn(
        angle_degree_int_in,
        5,
        1
        ) + " Rad: " + quest_General.quest_Get_Number_WithColumnPadding_AsStringOut_Fn(
        angle_degree_int_in * (3.1416 / 180),
        10,
        4
        ) + " Tan: " + quest_General.quest_Get_Number_WithColumnPadding_AsStringOut_Fn(
        Math.tan(angle_degree_int_in * (3.1416 / 180)),
        10,
        4
        ) + " | x=2, y:" + quest_General.quest_Get_Number_WithColumnPadding_AsStringOut_Fn(
        _local_new_y_int,
        5,
        1
        ) + " | y=2, x: " + quest_General.quest_Get_Number_WithColumnPadding_AsStringOut_Fn(
        _local_new_x_int,
        5,
        1
        ) + " || Origin@Cent::" + " x: " + _local_grid__origin_at_center__x_int + " y: " + _local_grid__origin_at_center__y_int + " | Origin@UpLe::" + " x: " + _local_grid__origin_at_upper_left__x_int + " y: " + _local_grid__origin_at_upper_left__y_int)
    }
}
function convert_Joytick__Raw_To_Cartesian__Y_Int_Func (raw_value_int_in: number) {
    _local_converted_value_int_out = (raw_value_int_in - controller_Joystick__Raw_OriginAtBottomRight__XandY_Center) * 1
    return _local_converted_value_int_out
}
function convert_Joytick__Raw_To_Cartesian__X_Int_Func (raw_value_int_in: number) {
    _local_converted_value_int_out = (raw_value_int_in - controller_Joystick__Raw_OriginAtBottomRight__XandY_Center) * -1
    return _local_converted_value_int_out
}
function setup_ControllerOnly_Fn () {
    if (true) {
        joystickbit.initJoystickBit()
    }
    if (true) {
        controller_Joystick__Raw_OriginAtBottomRight__Y_Int = 0
        controller_Joystick__Raw_OriginAtBottomRight__X_Int = 0
        controller_Joystick__Raw_OriginAtBottomRight__XandY_Center = 512
    }
    if (true) {
        controller_Joystick__Polar_OriginAtCenter__AngleDegree__AsIncremented_By__Int = 90
        controller_Joystick__Polar_OriginAtCenter__RayDistance__Deadzone_AsIdle__INT = 15
    }
}
function screen_IconMesssage_Func (screen_IconMessage_Id_Str_In: string) {
    if (!(device_Mode_Edit_Bool)) {
        if (screen_IconMessage_Id_Str_In == "bot") {
            _codeComment_AsText = "B = Bot"
            if (true) {
                led.plotBrightness(3, 4, screenBrightness_LO_INT)
                led.plotBrightness(3, 3, screenBrightness_LO_INT)
                led.plotBrightness(3, 2, screenBrightness_LO_INT)
                led.plotBrightness(3, 1, screenBrightness_LO_INT)
            }
            if (true) {
                led.plotBrightness(2, 3, screenBrightness_LO_INT)
                led.plotBrightness(2, 1, screenBrightness_LO_INT)
            }
            if (true) {
                led.plotBrightness(1, 3, screenBrightness_LO_INT)
                led.plotBrightness(1, 2, screenBrightness_LO_INT)
                led.plotBrightness(1, 1, screenBrightness_LO_INT)
            }
        } else if (screen_IconMessage_Id_Str_In == "controller") {
            _codeComment_AsText = "C = Controller"
            if (true) {
                led.plotBrightness(1, 1, screenBrightness_LO_INT)
                led.plotBrightness(1, 2, screenBrightness_LO_INT)
                led.plotBrightness(1, 3, screenBrightness_LO_INT)
            }
            if (true) {
                led.plotBrightness(2, 3, screenBrightness_LO_INT)
                led.plotBrightness(3, 3, screenBrightness_LO_INT)
            }
            if (true) {
                led.plotBrightness(2, 1, screenBrightness_LO_INT)
                led.plotBrightness(3, 1, screenBrightness_LO_INT)
            }
        } else if (screen_IconMessage_Id_Str_In == "error") {
            _codeComment_AsText = "All 4 Corners Lit: Simple to Code"
            if (true) {
                led.plotBrightness(0, 0, screenBrightness_HI_DEFAULT_INT)
                led.plotBrightness(4, 0, screenBrightness_HI_DEFAULT_INT)
                led.plotBrightness(0, 4, screenBrightness_HI_DEFAULT_INT)
                led.plotBrightness(4, 4, screenBrightness_HI_DEFAULT_INT)
            }
        } else if (screen_IconMessage_Id_Str_In == "1") {
            if (true) {
                led.plotBrightness(0, 1, screenBrightness_HI_DEFAULT_INT)
                led.plotBrightness(0, 2, screenBrightness_HI_DEFAULT_INT)
                led.plotBrightness(0, 3, screenBrightness_HI_DEFAULT_INT)
            }
        } else if (screen_IconMessage_Id_Str_In == "2") {
            if (true) {
                led.plotBrightness(4, 1, screenBrightness_HI_DEFAULT_INT)
                led.plotBrightness(4, 2, screenBrightness_HI_DEFAULT_INT)
                led.plotBrightness(4, 3, screenBrightness_HI_DEFAULT_INT)
            }
        } else if (screen_IconMessage_Id_Str_In == "d") {
            if (true) {
                led.plotBrightness(1, 0, screenBrightness_HI_DEFAULT_INT)
                led.plotBrightness(2, 0, screenBrightness_HI_DEFAULT_INT)
                led.plotBrightness(3, 0, screenBrightness_HI_DEFAULT_INT)
            }
        } else if (screen_IconMessage_Id_Str_In == "u") {
            if (true) {
                led.plotBrightness(1, 4, screenBrightness_HI_DEFAULT_INT)
                led.plotBrightness(2, 4, screenBrightness_HI_DEFAULT_INT)
                led.plotBrightness(3, 4, screenBrightness_HI_DEFAULT_INT)
            }
        } else {
            error_Message_Func("2024-0213-1740", screen_IconMessage_Id_Str_In)
        }
    }
}
function convert_Controller_Joystick__Cartesian_To_Polar__AngleDegree_AsIncremented_Int_Func_NOPARAMETERS () {
    return convert_Controller_Joystick__Cartesian_To_Polar__AngleDegree_AsIncremented_Int_Func(controller_Joystick__Cartesian_OriginAtCenter__X_Int, controller_Joystick__Cartesian_OriginAtCenter__Y_Int, controller_Joystick__Polar_OriginAtCenter__AngleDegree__AsIncremented_By__Int)
}
input.onButtonPressed(Button.AB, function () {
    device_Type_Bot_Bool = false
    if (!(device_Type_Controller_Bool)) {
        device_Type_Controller_Bool = true
        setup_ControllerOnly_Fn()
    }
})
// RQ-BX-G (Global)
radio.onReceivedString(function (receivedString) {
    if (true) {
        _codeComment_AsText = "For Local-Controller-Remote"
        if (!(device_Type_Bot_Bool)) {
            _codeComment_AsText = "Only place that activates Bot"
            _codeComment_AsText = "Bot can only be activated by wake-up message from Controller-Remote"
            device_Type_Bot_Bool = true
            setup_BotOnly_Fn()
        } else if (device_Type_Bot_Bool && !(device_Mode_Edit_Bool)) {
            if (true) {
                if (true) {
                    serial.writeLine("> RadioNetwork:> " + receivedString + " <")
                }
                screen_Clear_Func()
                if (true) {
                    if (receivedString == "forward") {
                        quest_Motors.quest_Set_PowerMotorsViaBlueRedBlackPins_Fn(
                        quest_PortGroup_BlueRedBlack_PortIds_Enum.S1_MotorLeft__S0_MotorRight,
                        motor_Power_Full_Current_Pos,
                        motor_Power_Full_Current_Pos
                        )
                        led.plot(2, 4)
                    } else if (receivedString == "backward") {
                        quest_Motors.quest_Set_PowerMotorsViaBlueRedBlackPins_Fn(
                        quest_PortGroup_BlueRedBlack_PortIds_Enum.S1_MotorLeft__S0_MotorRight,
                        motor_Power_Full_Current_Neg,
                        motor_Power_Full_Current_Neg
                        )
                        led.plot(2, 0)
                    } else if (receivedString == "left") {
                        quest_Motors.quest_Set_PowerMotorsViaBlueRedBlackPins_Fn(
                        quest_PortGroup_BlueRedBlack_PortIds_Enum.S1_MotorLeft__S0_MotorRight,
                        motor_Power_Full_Current_Neg,
                        motor_Power_Full_Current_Pos
                        )
                        led.plot(4, 2)
                    } else if (receivedString == "right") {
                        quest_Motors.quest_Set_PowerMotorsViaBlueRedBlackPins_Fn(
                        quest_PortGroup_BlueRedBlack_PortIds_Enum.S1_MotorLeft__S0_MotorRight,
                        motor_Power_Full_Current_Pos,
                        motor_Power_Full_Current_Neg
                        )
                        led.plot(0, 2)
                    } else if (receivedString == "stop") {
                        _codeComment_AsText = "To complement Gear Icons"
                        // //jwc o roboQuest.powerMotorsViaBlueRedBlackPins(PortGroup_BlueRedBlack__PortIds__Enum.S1_MotorLeft__S0_MotorRight, motor_Power_ZERO_INT, motor_Power_ZERO_INT)
                        quest_Motors.quest_Set_PowerMotorsViaBlueRedBlackPins_Fn(
                        quest_PortGroup_BlueRedBlack_PortIds_Enum.S1_MotorLeft__S0_MotorRight,
                        motor_Power_ZERO_INT,
                        motor_Power_ZERO_INT
                        )
                        led.plot(2, 2)
                        _codeComment_AsText = "During idle, show entity-type: B=Bot, C=Controller"
                        screen_IconMesssage_Func("bot")
                    } else if (receivedString == "arm_down") {
                        let servoArm_DOWN_DEGREES_INT = 0
                        pins.servoWritePin(AnalogPin.P15, servoArm_DOWN_DEGREES_INT)
                        screen_IconMesssage_Func("d")
                    } else if (receivedString == "arm_up") {
                        let servoArm_UP_DEGREES_INT = 0
                        pins.servoWritePin(AnalogPin.P15, servoArm_UP_DEGREES_INT)
                        screen_IconMesssage_Func("u")
                    } else if (receivedString == "gear_lo") {
                        if (true) {
                            motor_Power_Full_Current_Pos = motor_Power_Gear_01_MAX
                            motor_Power_Full_Current_Neg = -1 * motor_Power_Full_Current_Pos
                            motor_Power_Half_Current = Math.round(0.5 * motor_Power_Full_Current_Pos)
                            screen_IconMesssage_Func("1")
                        }
                    } else if (receivedString == "gear_hi") {
                        if (true) {
                            motor_Power_Full_Current_Pos = motor_Power_Gear_02_MAX
                            motor_Power_Full_Current_Neg = -1 * motor_Power_Full_Current_Pos
                            motor_Power_Half_Current = Math.round(0.5 * motor_Power_Full_Current_Pos)
                            screen_IconMesssage_Func("2")
                        }
                    } else {
                        _codeComment_AsText = "Error: Unknown Msg"
                        // //jwc o roboQuest.powerMotorsViaBlueRedBlackPins(PortGroup_BlueRedBlack__PortIds__Enum.S1_MotorLeft__S0_MotorRight, motor_Power_ZERO_INT, motor_Power_ZERO_INT)
                        quest_Motors.quest_Set_PowerMotorsViaBlueRedBlackPins_Fn(
                        quest_PortGroup_BlueRedBlack_PortIds_Enum.S1_MotorLeft__S0_MotorRight,
                        motor_Power_ZERO_INT,
                        motor_Power_ZERO_INT
                        )
                        if (true) {
                            _codeComment_AsText = "For now, all 4 corners = Error: Unknown Msg"
                            error_Message_Func("2024-0213-1700", "abc")
                            screen_IconMesssage_Func("error")
                        }
                    }
                }
                network__CpuCycle_Post__Management_Func()
            }
        }
    }
})
// * Techncial Notes
// 
// * 2019-0519-0340
// 
// ** DFRobot Driver Expansion Board
// 
// * 2019-0525-09-HAA TYJ first complete joystick XY
// 
// ** Create more responsiven** Then switch to 'JavaScript' then do
// 
// *** 'let variable = 0'
// 
// *** 'variable = non-zero'
// 
// * MicroBit A/B Buttons not work well with LED Display, so use 'show string' instead
// 
// * Micro-Servo 9G A0090 (Sparkfun)
// 
// ~ HiTec HS-55
// 
// MicroBit: 'servo set pulse pin Px (e.g. P8) to (us) ___'  :)+
// 
// 0 no
// 
// 250 0
// 
// 500 no
// 
// >> 750: 45
// 
// 1000 90 - 10 = 80
// 
// 1250 90 + 10 = 100
// 
// >> 1500 90 + 30
// 
// 1750 180 - 30
// 
// 2000 170
// 
// 2250 190
// 
// >> 2500 225 = 180 + 30/45
// 
// 2750 no
// 
// 3000 no
// 
// * Using DFRobot Servo Pins not reliable, possibly since these are 3.3.v servos (not standard 5.0v servos), thus use MicroBit 'servo write pin Pxx' blocks for reliable 0-180 degrees.
// 
// * 2019-1019
// 
// * 2020-0120: 844 SW error : GC allocation failed for requested number bytes: GC (garbage collection) error of 57 variables max,
// 
// ** Delete 'index_y2' (tried to reuse but '844' error)
// 
// ** Tried to reuse 'item' but probably is a system var
// 
// ** Remove unused 'button_AandB_Countdown_CpuCycles', 'buttonA_Then_B_On'
// 
// ** Rename used-only-once-via-set:
// 
// *** 'dashboardDisplay_Brightness_HI' to 'servo_Pan_Degrees' :)+
// 
// *** 'groupChannel_Digit_MIN' to 'servo_Pan_Degrees'
// 
// *** 'groupChannel_Digit_MAX' to 'servo_Tilt_Degrees'
// 
// 
// 
// * 2020-0120-02: Arm Servo
// 
// ** S-bus not work (DFRobot driver), so switch to P-bus (MakeCode driver)
// 
// ** DfRobot only has P0, P1, P2 as Read/Write from MakeCode's Menu, so reserve for Read Only.  Rest for Write Only.
// 
// *** Ultrasonic Sensor: P0 (Read, Echo), P8 (Write, Trigger)
// 
// *** ServoArmRight: P12 (Write-Only)
// 
// *** PIxyCam: P13 (Write-Only) Pan Servo, P14 (Write-Only) Tilt Servo, P1 (Read) Dig In from PixyCam-P1, P2 (Read) Ana In from PIxyCam-P8, S8-Pwr, S8-Gnd
// 
// * 2020-0224-1215
// 
// ** Network Test w/ Gaming Server
// 
// *** w/ Sonar: Simulated or Real
// 
// *** w/ BotId: Random or Real
// 
// * 2020-0305
// 
// ** 844 Error 57,49 variable max issue: Consolidate 'index_X' 'index_Y' to 'index'
// 
// *** Delete obsolete 'joystick_Value'
// 
// * 2020-0328
// 
// ** DFRobot S1 not seem to work for Arm-Right, though worked before, go back to micro:bit P16
// 
// ** abandon usage of S1-S6 for now, not reliable, since not work before, yet TYJ P1-P16 does  :)+
input.onButtonPressed(Button.B, function () {
    if (device_Mode_Edit_Bool) {
        network_GroupChannel_MyBotAndController_Base0__Digit_Ones__Int += 1
        if (network_GroupChannel_MyBotAndController_Base0__Digit_Ones__Int > 9) {
            network_GroupChannel_MyBotAndController_Base0__Digit_Ones__Int = 1
        }
    }
})
// * General Notes
// 
// * 2019-0519-0340
// 
// ** DFRobot Driver Expansion Board
// 
// * 2019-0525-09-HAA TYJ first complete joystick XY
// 
// * Technical Notes
// 
// * 2019-1019
// 
// ** Create more responsiveness, no DeadZone
// 
// * 2020-0120: 844 SW error : GC allocation failed for requested number bytes: GC (garbage collection) error of 57 variables max,
// 
// ** Delete 'index_y2' (tried to reuse but '844' error)
// 
// ** Tried to reuse 'item' but probably is a system var
// 
// ** Remove unused 'button_AandB_Countdown_CpuCycles', 'buttonA_Then_B_On'
// 
// ** Rename used-only-once-via-set:
// 
// *** 'dashboardDisplay_Brightness_HI' to 'servo_Pan_Degrees' :)+
// 
// *** 'groupChannel_Digit_MIN' to 'servo_Pan_Degrees'
// 
// *** 'groupChannel_Digit_MAX' to 'servo_Tilt_Degrees'
// 
// * 2020-0120-02: Arm Servo
// 
// ** S-bus not work (DFRobot driver), so switch to P-bus (MakeCode driver)
// 
// ** DfRobot only has P0, P1, P2 as Read/Write from MakeCode's Menu, so reserve for Read Only.  Rest for Write Only.
// 
// *** Ultrasonic Sensor: P0 (Read, Echo), P8 (Write, Trigger)
// 
// *** ServoArmRight: P12 (Write-Only)
// 
// *** PIxyCam: P13 (Write-Only) Pan Servo, P14 (Write-Only) Tilt Servo, P1 (Read) Dig In from PixyCam-P1, P2 (Read) Ana In from PIxyCam-P8, S8-Pwr, S8-Gnd
// 
// * 2020-0224-1215
// 
// ** Network Test w/ Gaming Server
// 
// *** w/ Sonar: Simulated or Real
// 
// *** w/ BotId: Random or Real
// 
// * 2020-0305
// 
// ** 844 Error 57,49 variable max issue: Consolidate 'index_X' 'index_Y' to 'index'
// 
// *** Delete obsolete 'joystick_Value'
// 
// * 2020-0328
// 
// ** DFRobot S1 not seem to work for Arm-Right, though worked before, go back to micro:bit P16
// 
// ** abandon usage of S1-S6 for now, not reliable, since not work before, yet TYJ P1-P16 does  :)+
// 
// * 2020-04xx
// 
// Micro-Servo 9G A0090 (Sparkfun)
// 
// ~ HiTec HS-55
// 
// MicroBit: 'servo set pulse pin Px (e.g. P8) to (us) ___'  :)+
// 
// 0 no
// 
// 250 0
// 
// 500 no
// 
// >> 750: 45
// 
// 1000 90 - 10 = 80
// 
// 1250 90 + 10 = 100
// 
// >> 1500 90 + 30
// 
// 1750 180 - 30
// 
// 2000 170
// 
// 2250 190
// 
// >> 2500 225 = 180 + 30/45
// 
// 2750 no
// 
// 3000 no
// 
// * Using DFRobot Servo Pins not reliable, possibly since these are 3.3.v servos (not standard 5.0v servos), thus use MicroBit 'servo write pin Pxx' blocks for reliable 0-180 degrees.
function network__CpuCycle_Post__Management_Func () {
    if (true) {
        if (false) {
            _codeComment_AsText = "Deactivate to prevent inducing any network lag"
            _codeComment_AsText = "To not flood bot-server, add delay"
            basic.pause(network_Throttle_Controller_DelayPerCpuCycle_Int)
        }
        if (_debug_Serial_Print_Bool) {
            network_Throttle_MilliSec_Per_CpuCycle_End = control.millis()
            network_Throttle_MilliSec_Per_CpuCycle_Duration = network_Throttle_MilliSec_Per_CpuCycle_End - network_Throttle_MilliSec_Per_CpuCycle_Start
            network_Throttle_MilliSec_Per_CpuCycle_Start = network_Throttle_MilliSec_Per_CpuCycle_End
            serial.writeLine("\"*** *** Debug: network_Throttle_MilliSec_Per_CpuCycle_Duration: \"" + network_Throttle_MilliSec_Per_CpuCycle_Duration)
        }
    }
}
function error_Message_Func (date_time_stamp_as_errorid_in: string, error_message_str_in: string) {
    serial.writeLine(" !!! ERROR !!! " + date_time_stamp_as_errorid_in + " : " + error_message_str_in + " . ")
}
radio.onReceivedValue(function (name, value) {
    if (false) {
        quest_Note_5.quest_Show_String_For_Note_Big_Fn(
        "OBSOLETE"
        )
        if (!(device_Type_Bot_Bool)) {
            _codeComment_AsText = "Only place that activates Bot"
            _codeComment_AsText = "Bot can only be activated by wake-up message from Controller-Remote"
            device_Type_Bot_Bool = true
            setup_BotOnly_Fn()
        } else if (device_Type_Bot_Bool) {
            quest_Note_3.quest_Show_String_For_Note_Big_Fn(
            "Forwever: Receive Network Message from 'C'ontroller_Joyustick"
            )
            quest_Note_2.quest_Show_String_For_Note_Small_Fn(
            "micro:bit's led_screen is upside_down"
            )
            network_Message_Received_Ok_Bool = false
            if (name == "joystick") {
                network_Message_Received_Ok_Bool = true
                controller_Joystick__Polar_OriginAtCenter__AngleDegree_Int = value
                convert_Controller_Joystick_AngleDegrees_ToMicrobit5x5Screen_Fn(controller_Joystick__Polar_OriginAtCenter__AngleDegree_Int)
            } else if (name == "gear") {
                motor_Power_Gear_Number_Int = value
                if (motor_Power_Gear_Number_Int == 1) {
                    network_Message_Received_Ok_Bool = true
                    led.plot(2, 1)
                } else if (motor_Power_Gear_Number_Int == 2) {
                    network_Message_Received_Ok_Bool = true
                    led.plot(2, 3)
                } else {
                    quest_Note_1.quest_Show_String_For_Note_Small_Fn(
                    "Invalid Network Message: 'value'('motor_Power_Gear_Number_Int')"
                    )
                    error_Message_Func("24-0213-1730", "abc")
                }
            } else {
                quest_Note_1.quest_Show_String_For_Note_Small_Fn(
                "Invalid Network Message: 'name'"
                )
                error_Message_Func("24-0213-1731", "abc")
            }
            quest_Note_3.quest_Show_String_For_Note_Big_Fn(
            "Forever: Convert Network Message to Operate 'B'ot"
            )
            if (network_Message_Received_Ok_Bool) {
                if (true) {
                    if (true) {
                        quest_Note_2.quest_Show_String_For_Note_Big_Fn(
                        "Convert Network Message to Operate 'B'ot: "
                        )
                        if (controller_Joystick__Polar_OriginAtCenter__AngleDegree_Int == 0 || controller_Joystick__Polar_OriginAtCenter__AngleDegree_Int == 360) {
                            if (true) {
                                quest_Note_2.quest_Show_String_For_Note_Small_Fn(
                                "Controller_Joystick: East"
                                )
                                motor_Power_L_Neg100toPos100_Int = motor_Power_Full_Current_Pos
                                motor_Power_R_Neg100toPos100_Int = motor_Power_Full_Current_Neg
                            }
                        } else if (controller_Joystick__Polar_OriginAtCenter__AngleDegree_Int == 45) {
                            if (true) {
                                quest_Note_2.quest_Show_String_For_Note_Small_Fn(
                                "Controller_Joystick: North_East"
                                )
                                motor_Power_L_Neg100toPos100_Int = motor_Power_Full_Current_Pos
                                motor_Power_R_Neg100toPos100_Int = motor_Power_ZERO_INT
                            }
                        } else if (controller_Joystick__Polar_OriginAtCenter__AngleDegree_Int == 90) {
                            if (true) {
                                quest_Note_2.quest_Show_String_For_Note_Small_Fn(
                                "Controller_Joystick: North"
                                )
                                motor_Power_L_Neg100toPos100_Int = motor_Power_Full_Current_Pos
                                motor_Power_R_Neg100toPos100_Int = motor_Power_Full_Current_Pos
                            }
                        } else if (controller_Joystick__Polar_OriginAtCenter__AngleDegree_Int == 135) {
                            if (true) {
                                quest_Note_2.quest_Show_String_For_Note_Small_Fn(
                                "Controller_Joystick: North_West"
                                )
                                motor_Power_L_Neg100toPos100_Int = motor_Power_ZERO_INT
                                motor_Power_R_Neg100toPos100_Int = motor_Power_Full_Current_Pos
                            }
                        } else if (controller_Joystick__Polar_OriginAtCenter__AngleDegree_Int == 180) {
                            if (true) {
                                quest_Note_2.quest_Show_String_For_Note_Small_Fn(
                                "Controller_Joystick: West"
                                )
                                motor_Power_L_Neg100toPos100_Int = motor_Power_Full_Current_Neg
                                motor_Power_R_Neg100toPos100_Int = motor_Power_Full_Current_Pos
                            }
                        } else if (controller_Joystick__Polar_OriginAtCenter__AngleDegree_Int == 225) {
                            if (true) {
                                quest_Note_2.quest_Show_String_For_Note_Small_Fn(
                                "Controller_Joystick: South_West"
                                )
                                motor_Power_L_Neg100toPos100_Int = motor_Power_ZERO_INT
                                motor_Power_R_Neg100toPos100_Int = motor_Power_Full_Current_Neg
                            }
                        } else if (controller_Joystick__Polar_OriginAtCenter__AngleDegree_Int == 270) {
                            if (true) {
                                quest_Note_2.quest_Show_String_For_Note_Small_Fn(
                                "Controller_Joystick: South"
                                )
                                motor_Power_L_Neg100toPos100_Int = motor_Power_Full_Current_Neg
                                motor_Power_R_Neg100toPos100_Int = motor_Power_Full_Current_Neg
                            }
                        } else if (controller_Joystick__Polar_OriginAtCenter__AngleDegree_Int == 315) {
                            if (true) {
                                quest_Note_2.quest_Show_String_For_Note_Small_Fn(
                                "Controller_Joystick: South_East"
                                )
                                motor_Power_L_Neg100toPos100_Int = motor_Power_Full_Current_Neg
                                motor_Power_R_Neg100toPos100_Int = motor_Power_ZERO_INT
                            }
                        } else if (controller_Joystick__Polar_OriginAtCenter__AngleDegree_Int == -1) {
                            quest_Note_2.quest_Show_String_For_Note_Small_Fn(
                            "Controller_Joystick: None = Idle"
                            )
                            motor_Power_L_Neg100toPos100_Int = motor_Power_ZERO_INT
                            motor_Power_R_Neg100toPos100_Int = motor_Power_ZERO_INT
                        } else {
                            quest_Note_4.quest_Show_String_For_Note_Small_Fn(
                            "Invalid 'controller_Joystick_Angle_Degrees_AsIncremented_Int'"
                            )
                            error_Message_Func("2024-0212-1730", convertToText(controller_Joystick__Polar_OriginAtCenter__AngleDegree_Int))
                        }
                        if (motor_Power_Gear_Number_Int == 1) {
                            motor_Power_Full_Current_Pos = motor_Power_Gear_01_MAX * 1
                            motor_Power_Full_Current_Neg = motor_Power_Gear_01_MAX * -1
                        } else if (motor_Power_Gear_Number_Int == 2) {
                            motor_Power_Full_Current_Pos = motor_Power_Gear_02_MAX * 1
                            motor_Power_Full_Current_Neg = motor_Power_Gear_02_MAX * -1
                        }
                    }
                    quest_Motors.quest_Set_PowerMotorsViaBlueRedBlackPins_Fn(
                    quest_PortGroup_BlueRedBlack_PortIds_Enum.S1_MotorLeft__S0_MotorRight,
                    motor_Power_L_Neg100toPos100_Int,
                    motor_Power_R_Neg100toPos100_Int
                    )
                    if (true) {
                        ConvertNetworkMessage_ToOperateBot_PrintDebug_Fn(name, value, motor_Power_L_Neg100toPos100_Int, motor_Power_R_Neg100toPos100_Int)
                        quest_Note_1.quest_Show_String_For_Note_Small_Fn(
                        "End of line"
                        )
                        serial.writeLine("")
                    }
                }
            }
            network__CpuCycle_Post__Management_Func()
        }
    }
})
// 'deviceType_Bot_Bool' vs. 'deviceType_Controller_Bool'
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    device_Mode_Edit_Bool = !(device_Mode_Edit_Bool)
    if (!(device_Mode_Edit_Bool)) {
        _codeComment_AsText = "If just left 'groupChannel_Edit_Mode', then Reset 'radio set group'"
        network_GroupChannel_MyBotAndController_Base0_Int = network_GroupChannel_MyBotAndController_Base0__Digit_Tens__Int * 10 + network_GroupChannel_MyBotAndController_Base0__Digit_Ones__Int * 1
        radio.setGroup(network_GroupChannel_MyBotAndController_Base0_Int)
    } else {
        _codeComment_AsText = "If just entered 'groupChannel_Edit_Mode':"
        network_GroupChannel_MyBotAndController_Base0__Digit_Tens__Int = Math.idiv(network_GroupChannel_MyBotAndController_Base0_Int, 10)
        network_GroupChannel_MyBotAndController_Base0__Digit_Ones__Int = network_GroupChannel_MyBotAndController_Base0_Int % 10
    }
})
function convert_Controller_Joystick__Cartesian_To_Polar__RayDistance_Int_Func_NOPARAMETERS () {
    return convert_Controller_Joystick__Cartesian_To_Polar__RayDistance_Int_Func(controller_Joystick__Cartesian_OriginAtCenter__X_Int, controller_Joystick__Cartesian_OriginAtCenter__Y_Int)
}
function convert_Controller_Joystick__Cartesian_To_Polar__RayDistance_Int_Func (cartesian_side_adjacent_x_int_in: number, cartesian_side_opposite_y_int_in: number) {
    serial.writeString("> Convert::" + " Side_Adjacent: " + quest_General.quest_Get_Number_WithColumnPadding_AsStringOut_Fn(
    cartesian_side_adjacent_x_int_in,
    5,
    0
    ) + " Side_Opposite: " + quest_General.quest_Get_Number_WithColumnPadding_AsStringOut_Fn(
    cartesian_side_opposite_y_int_in,
    5,
    0
    ))
    quest_Note_1.quest_Show_String_For_Note_Small_Fn(
    "Calculate radius (pixels)"
    )
    _local_converted_value_int_out = Math.sqrt(cartesian_side_adjacent_x_int_in ** 2 + cartesian_side_opposite_y_int_in ** 2)
    serial.writeString(" Radius: " + quest_General.quest_Get_Number_WithColumnPadding_AsStringOut_Fn(
    _local_converted_value_int_out,
    10,
    4
    ))
    return _local_converted_value_int_out
}
let controller_Joystick__Polar_OriginAtCenter__RayDistance_Int = 0
let motor_Power_R_Neg100toPos100_Int = 0
let motor_Power_L_Neg100toPos100_Int = 0
let motor_Power_Gear_Number_Int = 0
let controller_Joystick__Polar_OriginAtCenter__AngleDegree_Int = 0
let network_Message_Received_Ok_Bool = false
let network_GroupChannel_MyBotAndController_Base0__Digit_Ones__Int = 0
let controller_Joystick__Cartesian_OriginAtCenter__Y_Int = 0
let controller_Joystick__Cartesian_OriginAtCenter__X_Int = 0
let controller_Joystick__Polar_OriginAtCenter__RayDistance__Deadzone_AsIdle__INT = 0
let controller_Joystick__Polar_OriginAtCenter__AngleDegree__AsIncremented_By__Int = 0
let controller_Joystick__Raw_OriginAtBottomRight__X_Int = 0
let controller_Joystick__Raw_OriginAtBottomRight__Y_Int = 0
let controller_Joystick__Raw_OriginAtBottomRight__XandY_Center = 0
let _local_grid__origin_at_upper_left__y_int = 0
let _local_grid__origin_at_upper_left__x_int = 0
let _local_grid__origin_at_center__y_int = 0
let _local_grid__origin_at_center__x_int = 0
let _local_new_y_int = 0
let _local_new_x_int = 0
let _debug_Serial_Print_Bool = false
let screenBrightness_LO_INT = 0
let screenBrightness_HI_DEFAULT_INT = 0
let device_Type_Controller_Bool = false
let network_GroupChannel_MyBotAndController_Base0__Digit_Tens__Int = 0
let motor_Power_Half_Current = 0
let motor_Power_Full_Current_Neg = 0
let motor_Power_Full_Current_Pos = 0
let motor_Power_ZERO_INT = 0
let motor_Power_Gear_02_MAX = 0
let motor_Power_Gear_01_MAX = 0
let device_Type_Bot_Bool = false
let _local_converted_value_int_out = 0
let device_Mode_Edit_Bool = false
let network_Throttle_Controller_DelayPerCpuCycle_Int = 0
let network_Throttle_MilliSec_Per_CpuCycle_Duration = 0
let network_Throttle_MilliSec_Per_CpuCycle_End = 0
let network_Throttle_MilliSec_Per_CpuCycle_Start = 0
let network_GroupChannel_MyBotAndController_Base0_Int = 0
let _codeComment_AsText = ""
if (true) {
    _codeComment_AsText = "Set GroupChannel-# for Both Bot & Controller-Remote."
    network_GroupChannel_MyBotAndController_Base0_Int = 1
    setup_Network_Fn()
    setup_BotAndController_Fn()
}
basic.forever(function () {
	
})
basic.forever(function () {
    if (device_Type_Controller_Bool && !(device_Mode_Edit_Bool)) {
        quest_Note_3.quest_Show_String_For_Note_Big_Fn(
        "Forever::: Send Network Message to 'B'ot:: Controller_Joystick: Buttons"
        )
        quest_Note_5.quest_Show_String_For_Note_Big_Fn(
        "Network Message 'name' Max_Character_Length: 8"
        )
        if (joystickbit.getButton(joystickbit.JoystickBitPin.P12)) {
            motor_Power_Gear_Number_Int = 1
            radio.sendString("gear_lo")
            led.plot(2, 1)
        } else if (joystickbit.getButton(joystickbit.JoystickBitPin.P13)) {
            motor_Power_Gear_Number_Int = 2
            radio.sendString("gear_hi")
            led.plot(2, 3)
        }
        network__CpuCycle_Post__Management_Func()
    }
})
basic.forever(function () {
    _codeComment_AsText = "DashboardDisplay_GroupChannel_Edit_Mode"
    if (device_Mode_Edit_Bool) {
        basic.clearScreen()
        _codeComment_AsText = "'groupChannel_Mine_Base1_Int' convert from Human-Base1 to XY-Base0"
        for (let index = 0; index <= network_GroupChannel_MyBotAndController_Base0__Digit_Tens__Int - 1; index++) {
            _codeComment_AsText = "Resides on Columns (Base0): 0 & 1"
            led.plot(Math.idiv(index, 5) + 0, index % 5)
        }
        for (let index2 = 0; index2 <= network_GroupChannel_MyBotAndController_Base0__Digit_Ones__Int - 1; index2++) {
            _codeComment_AsText = "Resides on Columns (Base0): 3 & 4"
            led.plot(Math.idiv(index2, 5) + 3, index2 % 5)
        }
    }
})
basic.forever(function () {
    quest_Note_3.quest_Show_String_For_Note_Big_Fn(
    "Block Coding Special Notes"
    )
    if (true) {
        quest_Note_2.quest_Show_String_For_Note_Big_Fn(
        "'If true then' Block also for modular organization and..."
        )
        quest_Note_2.quest_Show_String_For_Note_Big_Fn(
        "... convenient 'copy/paste/delete' of a group of blocks"
        )
    }
    if (true) {
        quest_Note_2.quest_Show_String_For_Note_Big_Fn(
        "In-Line Comments w/ Multiple-Colors for Varying Purposes and Priorities..."
        )
        quest_Note_2.quest_Show_String_For_Note_Big_Fn(
        "... Suggested Uses:"
        )
        quest_Note_1.quest_Show_String_For_Note_Small_Fn(
        "Comment: Priority Lo"
        )
        quest_Note_2.quest_Show_String_For_Note_Small_Fn(
        "Comment: Priority Mi"
        )
        quest_Note_3.quest_Show_String_For_Note_Small_Fn(
        "Comment: Priority Hi"
        )
        quest_Note_4.quest_Show_String_For_Note_Small_Fn(
        "Question?: Priority Hi!"
        )
        quest_Note_5.quest_Show_String_For_Note_Small_Fn(
        "Urgent TODO: Priority Hi!! "
        )
    }
})
basic.forever(function () {
    _codeComment_AsText = "Debug: Monitor Variables"
    _codeComment_AsText = "Debug: Deactivate to reduce CPU load"
    if (false) {
        serial.writeLine("deviceType_Bot_Bool:" + device_Type_Bot_Bool)
        serial.writeLine("deviceType_Controller_Bool:" + device_Type_Controller_Bool)
        basic.pause(3000)
    }
})
basic.forever(function () {
    _codeComment_AsText = "Fragment the letters to be interruptible between each 'show string' block"
    if (!(device_Type_Controller_Bool) && !(device_Type_Bot_Bool)) {
        basic.showString("P")
    }
    if (!(device_Type_Controller_Bool) && !(device_Type_Bot_Bool)) {
        basic.showString("u")
    }
    if (!(device_Type_Controller_Bool) && !(device_Type_Bot_Bool)) {
        basic.showString("s")
    }
    if (!(device_Type_Controller_Bool) && !(device_Type_Bot_Bool)) {
        basic.showString("h")
    }
    if (!(device_Type_Controller_Bool) && !(device_Type_Bot_Bool)) {
        basic.showString("A+B")
    }
    if (!(device_Type_Controller_Bool) && !(device_Type_Bot_Bool)) {
        basic.showString("But-")
    }
    if (!(device_Type_Controller_Bool) && !(device_Type_Bot_Bool)) {
        basic.showString("tons")
    }
    if (!(device_Type_Controller_Bool) && !(device_Type_Bot_Bool)) {
        basic.showString(".")
    }
})
basic.forever(function () {
    if (device_Type_Controller_Bool && !(device_Mode_Edit_Bool)) {
        quest_Note_3.quest_Show_String_For_Note_Big_Fn(
        "Forever::: Send Network Message to 'B'ot:: Controller_Joystick: Joystick"
        )
        quest_Note_5.quest_Show_String_For_Note_Big_Fn(
        "Network Message 'name' Max_Character_Length: 8"
        )
        if (true) {
            controller_Joystick__Raw_OriginAtBottomRight__X_Int = joystickbit.getRockerValue(joystickbit.rockerType.X)
            controller_Joystick__Cartesian_OriginAtCenter__X_Int = convert_Joytick__Raw_To_Cartesian__X_Int_Func(controller_Joystick__Raw_OriginAtBottomRight__X_Int)
            controller_Joystick__Raw_OriginAtBottomRight__Y_Int = joystickbit.getRockerValue(joystickbit.rockerType.Y)
            controller_Joystick__Cartesian_OriginAtCenter__Y_Int = convert_Joytick__Raw_To_Cartesian__Y_Int_Func(controller_Joystick__Raw_OriginAtBottomRight__Y_Int)
        }
        if (true) {
            controller_Joystick__Polar_OriginAtCenter__AngleDegree_Int = convert_Controller_Joystick__Cartesian_To_Polar__AngleDegree_AsIncremented_Int_Func_NOPARAMETERS()
            controller_Joystick__Polar_OriginAtCenter__RayDistance_Int = convert_Controller_Joystick__Cartesian_To_Polar__RayDistance_Int_Func_NOPARAMETERS()
        }
        screen_Clear_Func()
        if (controller_Joystick__Polar_OriginAtCenter__RayDistance_Int < controller_Joystick__Polar_OriginAtCenter__RayDistance__Deadzone_AsIdle__INT) {
            quest_Note_2.quest_Show_String_For_Note_Small_Fn(
            "Zero values if not exceed 'Deadzone_AsIdle'"
            )
            quest_Note_2.quest_Show_String_For_Note_Small_Fn(
            "Motion: Not"
            )
            radio.sendString("stop")
            led.plot(2, 2)
            screen_IconMesssage_Func("controller")
        } else {
            if (true) {
                quest_Note_2.quest_Show_String_For_Note_Small_Fn(
                "Motion: Yes"
                )
                quest_Note_2.quest_Show_String_For_Note_Big_Fn(
                "Convert Network Message to Operate 'B'ot: "
                )
                if (controller_Joystick__Polar_OriginAtCenter__AngleDegree_Int == 0 || controller_Joystick__Polar_OriginAtCenter__AngleDegree_Int == 360) {
                    if (true) {
                        quest_Note_2.quest_Show_String_For_Note_Small_Fn(
                        "Controller_Joystick: East"
                        )
                        radio.sendString("right")
                        led.plot(4, 2)
                    }
                } else if (controller_Joystick__Polar_OriginAtCenter__AngleDegree_Int == 90) {
                    if (true) {
                        quest_Note_2.quest_Show_String_For_Note_Small_Fn(
                        "Controller_Joystick: North"
                        )
                        radio.sendString("forward")
                        led.plot(2, 0)
                    }
                } else if (controller_Joystick__Polar_OriginAtCenter__AngleDegree_Int == 180) {
                    if (true) {
                        quest_Note_2.quest_Show_String_For_Note_Small_Fn(
                        "Controller_Joystick: West"
                        )
                        radio.sendString("left")
                        led.plot(0, 2)
                    }
                } else if (controller_Joystick__Polar_OriginAtCenter__AngleDegree_Int == 270) {
                    if (true) {
                        quest_Note_2.quest_Show_String_For_Note_Small_Fn(
                        "Controller_Joystick: South"
                        )
                        radio.sendString("backward")
                        led.plot(2, 4)
                    }
                } else {
                    quest_Note_4.quest_Show_String_For_Note_Small_Fn(
                    "Invalid 'controller_Joystick_Angle_Degrees_AsIncremented_Int'"
                    )
                    error_Message_Func("2024-0212-1730", convertToText(controller_Joystick__Polar_OriginAtCenter__AngleDegree_Int))
                }
                if (false) {
                    convert_Controller_Joystick_AngleDegrees_ToMicrobit5x5Screen_Fn(controller_Joystick__Polar_OriginAtCenter__AngleDegree_Int)
                }
            }
        }
        network__CpuCycle_Post__Management_Func()
    }
})
