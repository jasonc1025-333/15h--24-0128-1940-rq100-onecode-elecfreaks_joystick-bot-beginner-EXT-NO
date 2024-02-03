let _local_converted_value_int_out = 0
let _local_new_x_int = 0
let _local_new_y_int = 0
let _local_grid__origin_at_center__x_int = 0
let _local_grid__origin_at_center__y_int = 0
let _local_grid__origin_at_upper_left__x_int = 0
let _local_grid__origin_at_upper_left__y_int = 0
let controller_Joystick_Raw_XandY_Center = 0
let network_Message_Received_Ok_Bool = false
let controller_Joystick_Raw_Y_Int = 0
let controller_Joystick_Raw_X_Int = 0
let motor_Power_L_Neg100toPos100_Int = 0
let motor_Power_R_Neg100toPos100_Int = 0
let controller_Joystick_Cartesian_X_Int = 0
let controller_Joystick_Cartesian_Y_Int = 0
let controller_Joystick_Raw_Deadzone_AsIdle_Int = 0
let controller_Joystick_Angle_Degrees_Int = 0
let network_GroupChannel_MyBotAndController_Base0_Int = 0
// //jwc o let network_GroupChannel_MyBotAndController_Base0_Int = 0
function led_Show_Cartesian_XandY_Func (cartesian_x_int_in: number, cartesian_y_int_in: number) {
	
}
function convert_Controller_Joystick_Cartesian_To_Angle_Degrees_Int_Func (cartesian_side_adjacent_x_int_in: number, cartesian_side_opposite_y_int_in: number) {
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
function ConvertNetworkMessage_ToOperateBot_PrintDebug_Fn (name_Str_In: string, value_Int_In: number, motor_Power_L_Neg100toPos100_Int_In: number, motor_Power_R_Neg100toPos100_Int_In: number) {
    serial.writeString("*** " + name_Str_In + quest_General.quest_Get_Number_WithColumnPadding_AsStringOut_Fn(
    value_Int_In,
    5,
    0
    ) + "|| servo_motor_l:" + quest_General.quest_Get_Number_WithColumnPadding_AsStringOut_Fn(
    motor_Power_L_Neg100toPos100_Int_In,
    5,
    0
    ) + "|servo_motor_r:" + quest_General.quest_Get_Number_WithColumnPadding_AsStringOut_Fn(
    motor_Power_R_Neg100toPos100_Int_In,
    5,
    0
    ))
    quest_Note_1.quest_Show_String_For_Note_Small_Fn(
    "End of line"
    )
    serial.writeLine("")
}
function convert_Controller_Joystick_AngleDegrees_ToMicrobit5x5Screen_Fn (angle_degree_int_in: number) {
    if (angle_degree_int_in == 90) {
        quest_Note_1.quest_Show_String_For_Note_Small_Fn(
        "tan is undefined (divide by 0)"
        )
        _local_new_x_int = 0
        _local_new_y_int = 2
    } else if (angle_degree_int_in == -90) {
        quest_Note_1.quest_Show_String_For_Note_Small_Fn(
        "tan is undefined (divide by 0)"
        )
        _local_new_x_int = 0
        _local_new_y_int = -2
    } else {
        quest_Note_1.quest_Show_String_For_Note_Small_Fn(
        "tan is not undefined (not divide by 0)"
        )
        if (true) {
            quest_Note_1.quest_Show_String_For_Note_Small_Fn(
            "y=2, x:"
            )
            _local_new_x_int = 2 / Math.tan(angle_degree_int_in * (3.1416 / 180))
            if (Math.round(_local_new_x_int) <= 2) {
                _local_grid__origin_at_center__x_int = Math.round(_local_new_x_int)
                _local_grid__origin_at_center__y_int = 2
            }
        }
        if (true) {
            quest_Note_1.quest_Show_String_For_Note_Small_Fn(
            "x=2, y:"
            )
            _local_new_y_int = 2 * Math.tan(angle_degree_int_in * (3.1416 / 180))
            if (Math.round(_local_new_y_int) <= 2) {
                _local_grid__origin_at_center__x_int = 2
                _local_grid__origin_at_center__y_int = Math.round(_local_new_y_int)
            }
        }
        if (true) {
            _local_grid__origin_at_upper_left__x_int = _local_grid__origin_at_center__x_int + 2
            _local_grid__origin_at_upper_left__y_int = _local_grid__origin_at_center__y_int + 2
            if (false) {
                _local_grid__origin_at_upper_left__y_int = 4 - _local_grid__origin_at_center__y_int * -1
            }
            basic.clearScreen()
            led.plot(_local_grid__origin_at_upper_left__x_int, _local_grid__origin_at_upper_left__y_int)
        }
        quest_Note_1.quest_Show_String_For_Note_Small_Fn(
        " Grid5x5: x:  y:"
        )
        serial.writeString(" || Grid" + " Angle:: Deg:" + quest_General.quest_Get_Number_WithColumnPadding_AsStringOut_Fn(
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
        ) + " || Origin@Cent::" + " x: " + _local_grid__origin_at_center__x_int + " y: " + _local_grid__origin_at_center__x_int + " | Origin@UpLe::" + " x: " + _local_grid__origin_at_upper_left__x_int + " y: " + _local_grid__origin_at_upper_left__y_int)
    }
}
function receiveNetworkMessage_FromControllerJoystick_PrintError_Fn (name_Str_In: string, value_Int_In: number) {
    serial.writeLine("!!! ERROR !!!:" + "name:" + name_Str_In + "|value:" + value_Int_In)
}
function convert_Joytick_Raw_To_Cartesian_X_Int_Func (raw_value_int_in: number) {
    _local_converted_value_int_out = (raw_value_int_in - controller_Joystick_Raw_XandY_Center) * -1
    return _local_converted_value_int_out
}
function convert_Joytick_Raw_To_Cartesian_Y_Int_Func (raw_value_int_in: number) {
    _local_converted_value_int_out = (raw_value_int_in - controller_Joystick_Raw_XandY_Center) * 1
    return _local_converted_value_int_out
}
radio.onReceivedValue(function (name, value) {
    quest_Note_3.quest_Show_String_For_Note_Big_Fn(
    "Forwever: Receive Network Message from 'C'ontroller_Joyustick"
    )
    network_Message_Received_Ok_Bool = false
    if (name == "joy_y") {
        network_Message_Received_Ok_Bool = true
        controller_Joystick_Raw_Y_Int = value
    } else if (name == "joy_x") {
        network_Message_Received_Ok_Bool = true
        controller_Joystick_Raw_X_Int = value
    } else {
        receiveNetworkMessage_FromControllerJoystick_PrintError_Fn(name, value)
    }
    quest_Note_3.quest_Show_String_For_Note_Big_Fn(
    "Forever: Convert Network Message to Operate 'B'ot"
    )
    if (network_Message_Received_Ok_Bool) {
        if (true) {
            if (true) {
                if (true) {
                    quest_Note_2.quest_Show_String_For_Note_Big_Fn(
                    "Convert Netowrk Message to Operate 'B'ot: Part 1of2 ~ Initialize (Set) w/ Forward/Backward Motion"
                    )
                    quest_Note_4.quest_Show_String_For_Note_Small_Fn(
                    "Raw Controller_Joystick Y Values [0..1023]:: Motor_Power_%:Forward [L:+100%,R:+100%] vs. Motor_Power_%:Backward [L:-100%,R:-100%]"
                    )
                    motor_Power_L_Neg100toPos100_Int = Math.round(Math.map(controller_Joystick_Raw_Y_Int, 0, 1023, -30, 30))
                    motor_Power_R_Neg100toPos100_Int = Math.round(Math.map(controller_Joystick_Raw_Y_Int, 0, 1023, -30, 30))
                }
                if (true) {
                    quest_Note_2.quest_Show_String_For_Note_Big_Fn(
                    "Convert Netowrk Message to Operate 'B'ot: Part 2of2 ~ Add (Change) w/ Turning Motion"
                    )
                    quest_Note_4.quest_Show_String_For_Note_Small_Fn(
                    "Raw Controller_Joystick X Values [0..1023]:: Motor_Power_%:Turn_Right [L:+100%,R:-100%] vs Motor_Power_%:Turn_Left [L:-100%,R:+100%]"
                    )
                    motor_Power_L_Neg100toPos100_Int += Math.round(Math.map(controller_Joystick_Raw_X_Int, 0, 1023, 30, -30))
                    motor_Power_R_Neg100toPos100_Int += Math.round(Math.map(controller_Joystick_Raw_X_Int, 0, 1023, -30, 30))
                }
            }
            quest_Motors.quest_Set_PowerMotorsViaBlueRedBlackPins_Fn(
            quest_PortGroup_BlueRedBlack_PortIds_Enum.S1_MotorLeft__S0_MotorRight,
            motor_Power_L_Neg100toPos100_Int,
            motor_Power_R_Neg100toPos100_Int
            )
            ConvertNetworkMessage_ToOperateBot_PrintDebug_Fn(name, value, motor_Power_L_Neg100toPos100_Int, motor_Power_R_Neg100toPos100_Int)
        }
    }
})
basic.forever(function () {
    quest_Note_3.quest_Show_String_For_Note_Big_Fn(
    "Forwever: Send Network Message to 'B'ot"
    )
    quest_Note_5.quest_Show_String_For_Note_Big_Fn(
    "Network Message Max_Character_Length: 8"
    )
    controller_Joystick_Raw_X_Int = joystickbit.getRockerValue(joystickbit.rockerType.X)
    controller_Joystick_Cartesian_X_Int = convert_Joytick_Raw_To_Cartesian_X_Int_Func(controller_Joystick_Raw_X_Int)
    controller_Joystick_Raw_Y_Int = joystickbit.getRockerValue(joystickbit.rockerType.Y)
    controller_Joystick_Cartesian_Y_Int = convert_Joytick_Raw_To_Cartesian_Y_Int_Func(controller_Joystick_Raw_Y_Int)
    quest_Note_2.quest_Show_String_For_Note_Small_Fn(
    "Zero values if not exceed 'Deadzone_AsIdle'"
    )
    if (Math.abs(controller_Joystick_Cartesian_X_Int) <= controller_Joystick_Raw_Deadzone_AsIdle_Int) {
        controller_Joystick_Cartesian_X_Int = 0
    }
    if (Math.abs(controller_Joystick_Cartesian_Y_Int) <= controller_Joystick_Raw_Deadzone_AsIdle_Int) {
        controller_Joystick_Cartesian_Y_Int = 0
    }
    controller_Joystick_Angle_Degrees_Int = convert_Controller_Joystick_Cartesian_To_Angle_Degrees_Int_Func(controller_Joystick_Cartesian_X_Int, controller_Joystick_Cartesian_Y_Int)
    quest_Note_2.quest_Show_String_For_Note_Small_Fn(
    ""
    )
    convert_Controller_Joystick_AngleDegrees_ToMicrobit5x5Screen_Fn(controller_Joystick_Angle_Degrees_Int)
    quest_Note_2.quest_Show_String_For_Note_Small_Fn(
    ""
    )
    serial.writeLine(" <")
    quest_Note_2.quest_Show_String_For_Note_Small_Fn(
    ""
    )
    radio.sendValue("joy_x", 0)
    radio.sendValue("joy_y", 0)
    if (false) {
        serial.writeLine(">> joy_x:" + controller_Joystick_Raw_X_Int + " -> " + controller_Joystick_Cartesian_X_Int + " | " + "joy_y: " + controller_Joystick_Raw_Y_Int + " -> " + controller_Joystick_Cartesian_Y_Int + " <<")
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
    // * Ok icon to look upside_down when micro:bit upside_down
    if (false) {
        quest_Note_3.quest_Show_String_For_Note_Big_Fn(
        "One-Time Setup: 'C'ontroller_Joystick"
        )
        quest_Note_2.quest_Show_String_For_Note_Small_Fn(
        "'C' = 'C'ontroller_Joystick"
        )
        basic.showLeds(`
            . # # # #
            # . . . .
            # . . . .
            # . . . .
            . # # # #
            `)
        // * 3, 2, 1.5sec
        // /jwc o roboQuest.quest_ContinueCurrentState_CountdownTimer_Set_Fn(2, quest_Time_Units_Enum.Seconds)
        quest_Timer.quest_Set_ContinueCurrentState_CountdownTimer_Fn(2, quest_Time_Units_Enum.Seconds)
    }
    if (false) {
        quest_Note_3.quest_Show_String_For_Note_Big_Fn(
        "One-Time Setup: Network"
        )
        quest_Note_4.quest_Show_String_For_Note_Big_Fn(
        "Set Group_Channel_# for Both 'B'ot & 'C'ontroller_Joystick"
        )
        network_GroupChannel_MyBotAndController_Base0_Int = 1
        radio.setGroup(network_GroupChannel_MyBotAndController_Base0_Int)
        basic.showNumber(network_GroupChannel_MyBotAndController_Base0_Int)
    }
    if (true) {
        joystickbit.initJoystickBit()
    }
    if (true) {
        controller_Joystick_Raw_Y_Int = 0
        controller_Joystick_Raw_X_Int = 0
        controller_Joystick_Raw_XandY_Center = 512
        controller_Joystick_Raw_Deadzone_AsIdle_Int = 15
    }
})
basic.forever(function () {
    // * Ok icon to look upside_down when micro:bit upside_down
    if (false) {
        quest_Note_3.quest_Show_String_For_Note_Big_Fn(
        "One-Time Setup: 'B'ot"
        )
        quest_Note_2.quest_Show_String_For_Note_Small_Fn(
        "'B' = 'B'ot"
        )
        basic.showLeds(`
            # # # # .
            # . . . #
            # # # # #
            # . . . #
            # # # # .
            `)
        // * 3, 2, 1.5sec, 2 (to not confuse with default group_channel = 1
        // /jwc o roboQuest.quest_ContinueCurrentState_CountdownTimer_Set_Fn(2, quest_Time_Units_Enum.Seconds)
        quest_Timer.quest_Set_ContinueCurrentState_CountdownTimer_Fn(2, quest_Time_Units_Enum.Seconds)
    }
    if (false) {
        quest_Note_3.quest_Show_String_For_Note_Big_Fn(
        "One-Time Setup: Network"
        )
        quest_Note_4.quest_Show_String_For_Note_Big_Fn(
        "Set Group_Channel_# for Both 'B'ot & 'C'ontroller_Joystick"
        )
        network_GroupChannel_MyBotAndController_Base0_Int = 1
        radio.setGroup(network_GroupChannel_MyBotAndController_Base0_Int)
        basic.showNumber(network_GroupChannel_MyBotAndController_Base0_Int)
    }
})
