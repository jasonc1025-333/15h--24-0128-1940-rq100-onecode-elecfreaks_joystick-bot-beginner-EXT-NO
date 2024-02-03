/**
 * * Key Notes: Controller-Joystick (Network-Client)
 * 
 * * Yahboom Joystick
 * 
 * ** https://www.yahboom.net/study/SGH
 * 
 * ** https://github.com/lzty634158/GHBit
 * 
 * * DfRobot Driver Expansion Board
 * 
 * ** https://wiki.dfrobot.com/Micro_bit_Driver_Expansion_Board_SKU_DFR0548
 * 
 * ** https://github.com/DFRobot/pxt-motor
 */
/**
 * * General Notes
 * 
 * * 2020-0120: 844 SW error : GC allocation failed for requested number bytes: GC (garbage collection) error of 57 variables max,
 * 
 * * 2020-0120-02: Arm Servo
 * 
 * ** S-bus not work (DFRobot driver), so switch to P-bus (MakeCode driver)
 * 
 * ** DfRobot only has P0, P1, P2 as Read/Write from MakeCode's Menu, so reserve for Read Only.  Rest for Write Only.
 * 
 * *** Ultrasonic Sensor: P0 (Read, Echo), P8 (Write, Trigger)
 * 
 * *** ServoArmRight: P12 (Write-Only)
 * 
 * *** PIxyCam: P13 (Write-Only) Pan Servo, P14 (Write-Only) Tilt Servo, P1 (Read) Dig In from PixyCam-P1, P2 (Read) Ana In from PIxyCam-P8, S8-Pwr, S8-Gnd
 * 
 * * 2020-0305
 * 
 * ** 844 Error 57,49 variable max issue: Consolidate 'index_X' 'index_Y' to 'index'
 * 
 * * 2020-0328
 * 
 * ** DFRobot S1 not seem to work for Arm-Right, though worked before, go back to micro:bit P16
 * 
 * ** abandon usage of S1-S6 for now, not reliable, since not work before, yet TYJ P1-P16 does  :)+
 * 
 * * 2020-04xx
 * 
 * * Micro-Servo 9G A0090 (Sparkfun)
 * 
 * * HiTec HS-55
 * 
 * * MicroBit: 'servo set pulse pin Px (e.g. P8) to (us) ___'  :)+
 * 
 * * Using DFRobot Servo Pins not reliable, possibly since these are 3.3.v servos (not standard 5.0v servos), thus use MicroBit 'servo write pin Pxx' blocks for reliable 0-180 degrees.
 * 
 * 2021-0228
 * 
 * * DC Motors
 * 
 *   ** \ e.g. 155, 205, 255 (which is close enough to 255 during testing); delta 50
 * 
 *   ** 70% of 255 = 178.5 = 180 rounded-up; also (155+205)/2 = 180
 * 
 *   ** Stick w/ 155 (vs 180) for most significant difference vs Gear 2
 * 
 * * KEY BUG: 'round' not seems to work, thus do manually
 * 
 * * Button 'Release' Not Reliable, Seems Buggy
 * 
 * * Use Digital-Pin as a DIP Switch for Setup
 * 
 *   ** Use P16 since easiest to locate (at top) for quick change
 * 
 *   ** For Controller-Joystick: Yahboom: Appears P16 defaults to Low when Open-Circuit
 * 
 *   ** Remove P16-Dependency since unreliable open-circuit value: either 0 or 1
 * 
 * * Tried 10, but maybe not enough granularity, assuming have new, same-aged dc-motors.  
 * 
 *   ** Resume back to 5 (smallest significant)
 * 
 *   ** Even need more, then recommend replacing hardware: new pair of dc-motors. 
 * 
 * 2021-0301
 * 
 * * For Critical Configs, Best to send absolute value ('on radio received name value') vs relative values (on radio received 'receivedString'), for robustness vs. dropped packets
 * 
 *   ** This software config should be for small fine-tuning
 * 
 * * Tilt (/Rotation/Accelerometer) = 't_*' (Prefix-Header For Radio Messages)
 * 
 * ** WARNING: Seems like First condition ok when along, but when 2nd added, 1st is ignored. Thus 2-Level Logic Not Reliable
 * 
 * ** Original Motor0to255:(255,-255) -> (510,0) Add 255 here: Keep all positive since cannot radio two negative #, subtract 255 at destination
 * 
 * * Deactivate 'calibrate compass' since will force calibrate each new run of this code, which would be too much and inconvenient.  By default, calibrate occurs upon each flash, which is sufficient.
 * 
 * * Test Responsiveness-RealTime via Rocking-Joystick-BackAndForth-BothExtremes
 * 
 * * Both Bot and Controller appears automatically balanced at 40msec/cpu_cycle
 * 
 * ** As long avoid 400 msec consuming LED-displays
 * 
 * ** Thus keep at 0 msec
 * 
 * * Sonar
 * 
 * ** Standard/Default can be overridden by Master-Server
 * 
 * ** 15, 30, 45
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
 * Version History
 * 
 * * 2021-0220-2000-DAe-26-TYJ: Deadzone :)+
 * 
 * ** DBa Compass: Straight-away steering assist
 * 
 * ** DEa Debug-Serial-Print On/Off
 * 
 * ** dEBCe-27-TYJ -> DGa-27-TYJ fixed 'round' due to quadrants 2 & 4: opposite polarities prevented x.y radio msg
 * 
 * ** DLb RadioXDotYU
 * 
 * ** DMa Radio > ti_sc_xy
 * 
 * ** DOa Steering Assist: B2, B1
 */
/**
 * Very-Key Notes: All:
 * 
 * * 2nd level of conditions not reliable involving 'name', 'value' and 'button press'
 * 
 * * Prevent Boundary Issues with Rollover/FlipMSB, Thus Force Largest-Boundaried-Tilt, etc.: Constrain Raw Tilts: -90,+90 or -60,+60
 * 
 * * Disable code (pulling out of stack) is same as removing code and is effective for redeeming used disk/ram space
 * 
 * * Deadzone was 20, yet do 30 for safety buffer
 * 
 * * button_Debounce_TriggerDisableMsec: 'Pause appears to solve timing issue of multiple tx where gears are skipped, thus slow down tx: 100ms too fast - not help, 200ms best, 500ms better, 1s, 2s good
 * 
 * * Do not allow 'on shake/freefall/any_motion_event' for Bot since collision can accidentally trigger this
 * 
 * * MicroBit A/B Buttons not work well with LED Display, so use 'show string' instead
 * 
 * * Test Responsiveness-RealTime via Rocking-Joystick-BackAndForth-BothExtremes
 * 
 * ** 20msec :) not bad-but some lag, 50msec :) seems just right, 100msec not bad-but some lag
 * 
 * ** network_Throttle_PausePerCpuCycle_Int = 50
 * 
 * 2021-0307
 * 
 * * Round does work, yet for Quadrant 2, 4, opposite polarity causes X.Y Pair not work, since will not sum correctly, thus must offset with 255 for all positive message-transfer
 * 
 * * false = 0, true > 0 (non-zero)
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
function config_BotOnly_Setup_Fn () {
    if (deviceType_Bot_Bool) {
        if (true) {
            _codeComment_AsText = "DFRobot Driver Expansion Board"
            motor.motorStopAll()
        }
        if (true) {
            _codeComment_AsText = "Re-Initialize to most current value, to default to idle state. "
            compass_Current_Degrees = input.compassHeading()
        }
    }
}
function integerIn_StringOut_FixedWidth_Fn (integer_In: number, width_In: number, label_In: string) {
    _tmp_Int = integer_In
    _codeComment_AsText = "substring of 'blanks' should be wider to accommodate any requested widths 'width_In'"
    serial.writeString("" + label_In + " " + "                    ".substr(0, width_In - convertToText(_tmp_Int).length) + integer_In + ",")
}
function button_TriggerOnce_GivenRepeatTrigger_Fn () {
    _codeComment_AsText = "100ms not bad, nice repeating, but a little too fast, try 1s: seem too slow, try 500ms: a little long, try 200ms, too little, try 300"
    basic.pause(300)
}
input.onButtonPressed(Button.AB, function () {
    if (_system_BotAndController_Mode_Int == _system_BotAndController_Mode_As_Command_AsDefault_Int) {
        if (true) {
            _codeComment_AsText = "Start Config Mode"
            _system_BotAndController_Mode_Int = _system_BotAndController_Mode_As_Config_ChannelNum_Int
            _codeComment_AsText = "Only Local Change to Prevent Accidental Remote Change of Other Devices w/ Same Original Value"
            screen_Clear_Fn()
            led.plot(4, 0)
            button_TriggerOnce_GivenRepeatTrigger_Fn()
        }
    } else if (_system_BotAndController_Mode_Int != _system_BotAndController_Mode_As_Command_AsDefault_Int) {
        _codeComment_AsText = "End Config Mode"
        _system_BotAndController_Mode_Int = _system_BotAndControllelr_Mode_As_Config_End_Int
        _codeComment_AsText = "If just left 'groupChannel_Edit_Mode', then Reset 'radio set group'"
        _codeComment_AsText = "But will not do 'radio send string \"ch_set\"', since should set bot locally (vs remotely since could accidentally change someone else's bot)"
        radio.setGroup(groupChannel_MyBot_Base0_Int)
        _codeComment_AsText = "Show Current Config Settings for Manual Override in Actual Code, if Need Persistency"
        screen_ScrollText_Fn("C,h,:," + groupChannel_MyBot_Base0_Int + ";,M,t,r,S,l,o,w,L,:," + motor_Power_Slower_L_Int + ";,M,t,r,S,l,o,w,R,:," + motor_Power_Slower_R_Int)
        _codeComment_AsText = "Start Command Mode"
        _system_BotAndController_Mode_Int = _system_BotAndController_Mode_As_Command_AsDefault_Int
    }
})
radio.onReceivedValue(function (name, value) {
    _codeComment_AsText = "Criteria 1of1: Hardware=Based"
    _codeComment_AsText = "Seems 'name' is 8 char max, though 'on radio received ''receiveString''' does not seem to have such limitation"
    if (network_Mode_RadioWireless_Bool && (deviceType_Bot_Bool && !(deviceType_Controller_Bool))) {
        if (false) {
            _codeComment_AsText = "'serial write value 'name'='value'' uses ':' vs '='"
            serial.writeString("" + name + " " + value)
        }
        if (false) {
            _codeComment_AsText = "Keep Blank, since first if-statement hard to maintain (cannot be deleted)"
        } else if (name == "ti_sc_xy") {
            if (true) {
                led.unplot(tilt_Screen_X_0to4_Int, tilt_Screen_Y_0to4_Int)
                tilt_Screen_XY_0to4_Dec = value
                tilt_Screen_X_0to4_Int = Math.trunc(tilt_Screen_XY_0to4_Dec)
                tilt_Screen_Y_0to4_Int = Math.round((tilt_Screen_XY_0to4_Dec - Math.trunc(tilt_Screen_XY_0to4_Dec)) * 10)
                led.plotBrightness(tilt_Roll_X_Recenter_Raw_0to4_Int, tilt_Pitch_Y_Recenter_Raw_0to4_Int, screenBrightness_Lo_Int)
                led.plotBrightness(tilt_Screen_X_0to4_Int, tilt_Screen_Y_0to4_Int, screenBrightness_Default_Int)
            }
        } else if (name == "ti_ctr_y") {
            tilt_Pitch_Y_Recenter_Raw_0to4_Int = value
        } else if (name == "ti_ctr_x") {
            tilt_Roll_X_Recenter_Raw_0to4_Int = value
        } else if (name == "sl_set_l") {
            motor_Power_Slower_L_Int = value
        } else if (name == "sl_set_r") {
            motor_Power_Slower_R_Int = value
        } else if (name == "dbg_set") {
            _codeComment_AsText = "_debug_Serial_Print_Hi_Bool"
            if (value == 0) {
                _debug_Serial_Print_Hi_Bool = false
            } else {
                _debug_Serial_Print_Hi_Bool = true
            }
        } else if (name == "ti_mo_xy") {
            if (true) {
                tilt_RollX_PitchY_Motor_Neg0toPos510_Dec = value
                tilt_Roll_X_Motor_Neg255toPos255_Int = Math.trunc(tilt_RollX_PitchY_Motor_Neg0toPos510_Dec) - 255
                tilt_Pitch_Y_Motor_Neg255toPos255_Int = Math.round((tilt_RollX_PitchY_Motor_Neg0toPos510_Dec - Math.trunc(tilt_RollX_PitchY_Motor_Neg0toPos510_Dec)) * 1000 - 255)
            }
        } else if (name == "cm_sa_on") {
            compass_SteeringAssist_On_BoolInt = value
        } else {
            serial.writeLine("*** Invalid:" + name + ":" + value)
        }
        if (true) {
            _codeComment_AsText = "Always do this sub-stack since max cpu-cycles for driving motors for fastest real-time response"
            _codeComment_AsText = "Standard 1of3: Initialize w/ Pitch on Both Motors L & R - along w/ 'motor_Power_Slower*' adjustments"
            motor_Power_R_Int = tilt_Pitch_Y_Motor_Neg255toPos255_Int - motor_Power_Slower_R_Int
            motor_Power_L_Int = tilt_Pitch_Y_Motor_Neg255toPos255_Int - motor_Power_Slower_L_Int
            _codeComment_AsText = "Standard 2of3: Complement w/ Roll on Both Motors L & R"
            if (tilt_Roll_X_Motor_Neg255toPos255_Int > 0) {
                motor_Power_L_Int += -1 * tilt_Roll_X_Motor_Neg255toPos255_Int
                motor_Power_R_Int += 1 * tilt_Roll_X_Motor_Neg255toPos255_Int
            } else if (tilt_Roll_X_Motor_Neg255toPos255_Int < 0) {
                motor_Power_R_Int += 1 * tilt_Roll_X_Motor_Neg255toPos255_Int
                motor_Power_L_Int += -1 * tilt_Roll_X_Motor_Neg255toPos255_Int
            } else {
                _codeComment_AsText = "Else is 0, Then do nothing"
            }
            if (!(compass_SteeringAssist_On_BoolInt)) {
                _codeComment_AsText = "Not-Freeze 'compass_Target_Degrees' for De-Activated straight-lock-on (Steering Assist)"
                compass_Target_Degrees = compass_Current_Degrees
            } else {
                _codeComment_AsText = "Freeze 'compass_Target_Degrees' for Activated straight-lock-on (Steering Assist)"
                _codeComment_AsText = "Compass Steering Assist: Compoass Degrees 0-360: Clockwise"
                compass_Offset_TargetMinusCurrent = compass_Target_Degrees - compass_Current_Degrees
                _codeComment_AsText = "Compass Steering Assist: Accommodate crossing boundary from 0to360 or 360to0"
                while (compass_Offset_TargetMinusCurrent < -180) {
                    compass_Offset_TargetMinusCurrent += 1 * 360
                }
                while (compass_Offset_TargetMinusCurrent > 180) {
                    compass_Offset_TargetMinusCurrent += -1 * 360
                }
                _codeComment_AsText = "Compass Steering Assist: Activate if exceed/cross 'straight' boundaries, using spin turn for rapid-effectiveness"
                if (compass_Offset_TargetMinusCurrent > 0) {
                    motor_Power_R_Int += -1 * compass_Offset_TargetMinusCurrent
                    motor_Power_L_Int += 1 * compass_Offset_TargetMinusCurrent
                } else if (compass_Offset_TargetMinusCurrent < 0) {
                    motor_Power_L_Int += 1 * compass_Offset_TargetMinusCurrent
                    motor_Power_R_Int += -1 * compass_Offset_TargetMinusCurrent
                }
            }
            _codeComment_AsText = "Standard 3of3: Activate Motors"
            motor.MotorRun(motor.Motors.M1, motor.Dir.CCW, motor_Power_R_Int)
            motor.MotorRun(motor.Motors.M4, motor.Dir.CW, motor_Power_L_Int)
            if (_debug_Serial_Print_Hi_Bool) {
                serial.writeString("" + name + ": ")
                integerIn_StringOut_FixedWidth_Fn(tilt_RollX_PitchY_Motor_Neg0toPos510_Dec, 10, "a_ti510_X.Y")
                integerIn_StringOut_FixedWidth_Fn(tilt_Roll_X_Motor_Neg255toPos255_Int, 5, "b_ti255_X")
                integerIn_StringOut_FixedWidth_Fn(tilt_Pitch_Y_Motor_Neg255toPos255_Int, 5, "b_ti255_Y")
                integerIn_StringOut_FixedWidth_Fn(motor_Power_Slower_L_Int, 5, "c_sloL")
                integerIn_StringOut_FixedWidth_Fn(motor_Power_Slower_R_Int, 5, "c_sloR")
                integerIn_StringOut_FixedWidth_Fn(motor_Power_L_Int, 5, "d_mtrL")
                integerIn_StringOut_FixedWidth_Fn(motor_Power_R_Int, 5, "d_mtrR")
                integerIn_StringOut_FixedWidth_Fn(compass_Current_Degrees, 5, "z_cm360_Cur")
                integerIn_StringOut_FixedWidth_Fn(compass_Target_Degrees, 5, "z_cm360_Tar")
                integerIn_StringOut_FixedWidth_Fn(compass_Offset_TargetMinusCurrent, 5, "z_cm360_Off")
                serial.writeLine("")
            }
        }
    } else if (network_Mode_RadioWireless_Bool && !(deviceType_Controller_Bool) && !(deviceType_Bot_Bool)) {
        if (true) {
            _codeComment_AsText = "Only 1of1 place that activates Bot"
            _codeComment_AsText = "Bot can only be activated by any wake-up message from Controller-Joystick"
            deviceType_Bot_Bool = true
            config_BotOnly_Setup_Fn()
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
function config_BotAndController_Setup_Fn () {
    if (true) {
        _bool_False_0_Int = 0
        _bool_True_1_Int = 1
    }
    if (true) {
        _codeComment_AsText = "Default: None, since require manual activation since all-in-one code shared between both devices"
        deviceType_Controller_Bool = false
        deviceType_Bot_Bool = false
    }
    if (true) {
        screenBrightness_Default_Int = 255
        _codeComment_AsText = "127 not low enough, 15 is better, 1 too low, 7 seems best"
        screenBrightness_Lo_Int = 7
    }
    if (true) {
        _debug_Serial_Print_Lo_Bool = false
        _debug_Serial_Print_Hi_Bool = false
    }
    if (true) {
        _codeComment_AsText = "Tried 10, but maybe not enough granularity. Resume back to 5 (smallest significant)"
        motor_Power_Slower_Delta_Int = 5
        motor_Power_Slower_MIN_INT = 0
        motor_Power_Slower_MAX_INT = motor_Power_Slower_MIN_INT + motor_Power_Slower_Delta_Int * 4
        motor_Power_Slower_L_Int = motor_Power_Slower_MIN_INT
        motor_Power_Slower_R_Int = motor_Power_Slower_MIN_INT
    }
    if (true) {
        _system_BotAndController_Mode_As_Command_AsDefault_Int = 0
        _system_BotAndController_Mode_As_Config_ChannelNum_Int = 1
        _system_BotAndController_Mode_As_Config_Power_Slower_Int = 2
        _system_BotAndController_Mode_As_Config_DebugMode_Int = 3
        _system_BotAndController_Mode_As_Config__MAX_INT = 3
        _system_BotAndControllelr_Mode_As_Config_End_Int = -1
        _system_BotAndController_Mode_Int = _system_BotAndController_Mode_As_Command_AsDefault_Int
    }
    if (true) {
        _codeComment_AsText = ""
        motor_Power_Zero = 0
    }
    if (true) {
        joystick_Raw_CENTER_X_INT = 512
        joystick_Raw_CENTER_Y_INT = 512
        tilt_Roll_X_Recenter_Raw_Neg60toPos60_Int = 0
        tilt_Pitch_Y_Recenter_Raw_Neg60toPos60_Int = 0
        tilt_Roll_X_Recenter_Raw_0to4_Int = 2
        tilt_Pitch_Y_Recenter_Raw_0to4_Int = 2
        tilt_Raw_MAX_INT = 60
        tilt_Raw_MIN_INT = -60
        _codeComment_AsText = "50 was good, but previously, 20 was good, yet do 30 for safety margin"
        tilt_DeadZone_Idle_XandY_NEG255_TO_POS255_INT = 30
        compass_SteeringAssist_On_BoolInt = false
    }
}
function screen_ScrollText_Fn (text_Str_In: string) {
    _codeComment_AsText = "Fragment the substrings to be interruptible between each 'show string' block"
    _tmp_Str = text_Str_In.split(",")
    for (let value of _tmp_Str) {
        basic.showString("" + (value))
        if (deviceType_Controller_Bool || deviceType_Bot_Bool) {
            _codeComment_AsText = "Clear Screen to Remove Residue Pizels"
            screen_Clear_Fn()
            break;
        }
    }
}
function screen_Clear_Fn () {
    for (let index_X = 0; index_X <= 4; index_X++) {
        for (let index_Y = 0; index_Y <= 4; index_Y++) {
            led.unplot(index_X, index_Y)
        }
    }
}
function config_ControllerOnly_Setup_Fn () {
    if (deviceType_Controller_Bool) {
        if (true) {
            _codeComment_AsText = "Both Bot and Controller appears automatically balanced at 40msec/cpu_cycle"
            _system_Controller_UserInput_Tilt_Bool = false
        }
    }
}
function config_Network_Setup_Fn () {
    if (true) {
        _codeComment_AsText = "Network"
        if (true) {
            if (true) {
                network_Mode_RadioWireless_Bool = true
                network_Mode_UsbSerialCable_Bool = false
            }
        }
        if (true) {
            _codeComment_AsText = "Constant Channel # for Master Server, which Receives Everyone's Score. Use 255 vs 0, since 0 could be easily used by normal users"
            groupChannel_MasterServer_Base0_Int = 255
        }
        if (true) {
            groupChannel_MyBot_Base0_MAX_INT = 20
            radio.setGroup(groupChannel_MyBot_Base0_Int)
            basic.showString("Ch:" + groupChannel_MyBot_Base0_Int)
        }
    }
}
let joystick_Tilt_Y_Neg512toPos512_Int = 0
let joystick_Tilt_X_Neg512toPos512_Int = 0
let joystick_Raw_Y_1to1023_Int = 0
let joystick_Raw_X_1to1023_Int = 0
let joystick_Tilt_X_Neg60toPos60_Int = 0
let joystick_Tilt_Y_Neg60toPos60_Int = 0
let tilt_Roll_X_Raw_Neg60toPos60_Int = 0
let tilt_Pitch_Y_Raw_Neg60toPos60_Int = 0
let groupChannel_MyBot_Base0_MAX_INT = 0
let groupChannel_MasterServer_Base0_Int = 0
let network_Mode_UsbSerialCable_Bool = false
let _system_Controller_UserInput_Tilt_Bool = false
let _tmp_Str: string[] = []
let tilt_DeadZone_Idle_XandY_NEG255_TO_POS255_INT = 0
let tilt_Raw_MIN_INT = 0
let tilt_Raw_MAX_INT = 0
let tilt_Pitch_Y_Recenter_Raw_Neg60toPos60_Int = 0
let tilt_Roll_X_Recenter_Raw_Neg60toPos60_Int = 0
let joystick_Raw_CENTER_Y_INT = 0
let joystick_Raw_CENTER_X_INT = 0
let motor_Power_Zero = 0
let _system_BotAndController_Mode_As_Config__MAX_INT = 0
let _system_BotAndController_Mode_As_Config_DebugMode_Int = 0
let _system_BotAndController_Mode_As_Config_Power_Slower_Int = 0
let motor_Power_Slower_MAX_INT = 0
let motor_Power_Slower_MIN_INT = 0
let motor_Power_Slower_Delta_Int = 0
let _debug_Serial_Print_Lo_Bool = false
let _bool_True_1_Int = 0
let _bool_False_0_Int = 0
let compass_Offset_TargetMinusCurrent = 0
let compass_Target_Degrees = 0
let motor_Power_L_Int = 0
let motor_Power_R_Int = 0
let compass_SteeringAssist_On_BoolInt = 0
let tilt_Pitch_Y_Motor_Neg255toPos255_Int = 0
let tilt_Roll_X_Motor_Neg255toPos255_Int = 0
let tilt_RollX_PitchY_Motor_Neg0toPos510_Dec = 0
let _debug_Serial_Print_Hi_Bool = false
let screenBrightness_Default_Int = 0
let screenBrightness_Lo_Int = 0
let tilt_Pitch_Y_Recenter_Raw_0to4_Int = 0
let tilt_Roll_X_Recenter_Raw_0to4_Int = 0
let tilt_Screen_XY_0to4_Dec = 0
let tilt_Screen_Y_0to4_Int = 0
let tilt_Screen_X_0to4_Int = 0
let deviceType_Controller_Bool = false
let network_Mode_RadioWireless_Bool = false
let motor_Power_Slower_R_Int = 0
let motor_Power_Slower_L_Int = 0
let _system_BotAndControllelr_Mode_As_Config_End_Int = 0
let _system_BotAndController_Mode_As_Config_ChannelNum_Int = 0
let _system_BotAndController_Mode_As_Command_AsDefault_Int = 0
let _system_BotAndController_Mode_Int = 0
let _tmp_Int = 0
let compass_Current_Degrees = 0
let deviceType_Bot_Bool = false
let groupChannel_MyBot_Base0_Int = 0
let _codeComment_AsText = ""
if (true) {
    _codeComment_AsText = "Set GroupChannel-# for Both Bot & Controller-Joystick."
    groupChannel_MyBot_Base0_Int = 1
    config_Network_Setup_Fn()
    config_BotAndController_Setup_Fn()
}
basic.forever(function () {
    if (network_Mode_RadioWireless_Bool && !(deviceType_Controller_Bool) && !(deviceType_Bot_Bool)) {
        screen_ScrollText_Fn("P,u,s,h,D,o,w,n,O,n,J,o,y,s,t,i,c,k,.")
    }
})
basic.forever(function () {
    if (_system_BotAndController_Mode_Int == _system_BotAndController_Mode_As_Command_AsDefault_Int) {
        if (!(deviceType_Controller_Bool) && !(deviceType_Bot_Bool) && GHBit.Rocker(GHBit.enRocker.Press)) {
            _codeComment_AsText = "Only place that activates Controller-Joystick"
            deviceType_Bot_Bool = false
            deviceType_Controller_Bool = true
            if (true) {
                serial.writeLine("*** deviceType_Bot_Bool: " + deviceType_Bot_Bool)
                serial.writeLine("*** deviceType_Controller_Bool: " + deviceType_Controller_Bool)
            }
            config_ControllerOnly_Setup_Fn()
            button_TriggerOnce_GivenRepeatTrigger_Fn()
        } else if (deviceType_Controller_Bool && GHBit.Button(GHBit.enButton.B4, GHBit.enButtonState.Press)) {
            _codeComment_AsText = "Button 'Release' Not Reliable, Seems Buggy"
            _system_Controller_UserInput_Tilt_Bool = !(_system_Controller_UserInput_Tilt_Bool)
            if (!(_system_Controller_UserInput_Tilt_Bool)) {
                _codeComment_AsText = "Since Enter Joystick-Mode, Force Reset since would confuse Joystick"
                tilt_Pitch_Y_Recenter_Raw_Neg60toPos60_Int = 0
                tilt_Roll_X_Recenter_Raw_Neg60toPos60_Int = 0
                tilt_Pitch_Y_Recenter_Raw_0to4_Int = 2
                tilt_Roll_X_Recenter_Raw_0to4_Int = 2
                radio.sendValue("ti_ctr_y", tilt_Pitch_Y_Recenter_Raw_0to4_Int)
                radio.sendValue("ti_ctr_x", tilt_Roll_X_Recenter_Raw_0to4_Int)
            }
            button_TriggerOnce_GivenRepeatTrigger_Fn()
        } else if (deviceType_Controller_Bool && GHBit.Button(GHBit.enButton.B2, GHBit.enButtonState.Press)) {
            _codeComment_AsText = "Freeze real-time update to 'compass_Target_Degrees' for Steering-Assist Activation"
            radio.sendValue("cm_sa_on", _bool_True_1_Int)
        } else if (deviceType_Controller_Bool && GHBit.Button(GHBit.enButton.B1, GHBit.enButtonState.Press)) {
            _codeComment_AsText = "Not-Freeze real-time update to 'compass_Target_Degrees' for Steering-Assist De-Activation"
            radio.sendValue("cm_sa_on", _bool_False_0_Int)
        } else if (deviceType_Controller_Bool && (_system_Controller_UserInput_Tilt_Bool && GHBit.Button(GHBit.enButton.B3, GHBit.enButtonState.Press))) {
            if (true) {
                _codeComment_AsText = "Tilt-Motion: Re-Center Stop: Pitch 0%, Roll 0%"
                tilt_Pitch_Y_Recenter_Raw_Neg60toPos60_Int = Math.constrain(input.rotation(Rotation.Pitch), tilt_Raw_MIN_INT, tilt_Raw_MAX_INT)
                tilt_Roll_X_Recenter_Raw_Neg60toPos60_Int = Math.constrain(input.rotation(Rotation.Roll), tilt_Raw_MIN_INT, tilt_Raw_MAX_INT)
                tilt_Pitch_Y_Recenter_Raw_0to4_Int = Math.round(Math.map(tilt_Pitch_Y_Recenter_Raw_Neg60toPos60_Int, tilt_Raw_MIN_INT, tilt_Raw_MAX_INT, 0, 4))
                tilt_Roll_X_Recenter_Raw_0to4_Int = Math.round(Math.map(tilt_Roll_X_Recenter_Raw_Neg60toPos60_Int, tilt_Raw_MIN_INT, tilt_Raw_MAX_INT, 0, 4))
                radio.sendValue("ti_ctr_y", tilt_Pitch_Y_Recenter_Raw_0to4_Int)
                radio.sendValue("ti_ctr_x", tilt_Roll_X_Recenter_Raw_0to4_Int)
            }
        }
    }
})
basic.forever(function () {
    _codeComment_AsText = "Criteria 1of2: Hardware=Based"
    if (network_Mode_RadioWireless_Bool && (deviceType_Controller_Bool && !(deviceType_Bot_Bool))) {
        _codeComment_AsText = "Criteria 2of2: Software=Based"
        if (_system_BotAndController_Mode_Int == _system_BotAndController_Mode_As_Command_AsDefault_Int || _system_BotAndController_Mode_Int == _system_BotAndController_Mode_As_Config_Power_Slower_Int) {
            _codeComment_AsText = "Part 1of3: Main-Cycle-Pre"
            if (false) {
                _codeComment_AsText = "Do Nothing"
            } else if (_system_Controller_UserInput_Tilt_Bool) {
                if (true) {
                    _codeComment_AsText = "Tilt-Motion: Pitch -100%/+100%%, Roll -100%/+100%"
                    tilt_Pitch_Y_Raw_Neg60toPos60_Int = Math.constrain(input.rotation(Rotation.Pitch), tilt_Raw_MIN_INT, tilt_Raw_MAX_INT)
                    tilt_Roll_X_Raw_Neg60toPos60_Int = Math.constrain(input.rotation(Rotation.Roll), tilt_Raw_MIN_INT, tilt_Raw_MAX_INT)
                }
            } else if (!(_system_Controller_UserInput_Tilt_Bool)) {
                if (true) {
                    _codeComment_AsText = "Default: Tilt-Motion-Not: Joystick: Pitch:: Joystick_Tilt_Y, Roll: Joystick_Tilt_X"
                    tilt_Pitch_Y_Raw_Neg60toPos60_Int = joystick_Tilt_Y_Neg60toPos60_Int
                    tilt_Roll_X_Raw_Neg60toPos60_Int = joystick_Tilt_X_Neg60toPos60_Int
                }
            }
            _codeComment_AsText = "Part 2of3: Main-Cycle"
            if (_system_Controller_UserInput_Tilt_Bool || !(_system_Controller_UserInput_Tilt_Bool)) {
                if (true) {
                    if (true) {
                        _codeComment_AsText = "Re-Center Offset Subtracted Away, Even if None"
                        tilt_Pitch_Y_Raw_Neg60toPos60_Int += Math.round(-1 * tilt_Pitch_Y_Recenter_Raw_Neg60toPos60_Int)
                        tilt_Roll_X_Raw_Neg60toPos60_Int += Math.round(-1 * tilt_Roll_X_Recenter_Raw_Neg60toPos60_Int)
                        _codeComment_AsText = "Due to Boundary Issue (Flips to Inverse Sign), Earlier Boundaries (-10 Power), Thus 245 (vs 255) Power"
                        tilt_Roll_X_Motor_Neg255toPos255_Int = Math.round(Math.map(tilt_Roll_X_Raw_Neg60toPos60_Int, tilt_Raw_MIN_INT, tilt_Raw_MAX_INT, 255, -255))
                        tilt_Pitch_Y_Motor_Neg255toPos255_Int = Math.round(Math.map(tilt_Pitch_Y_Raw_Neg60toPos60_Int, tilt_Raw_MIN_INT, tilt_Raw_MAX_INT, 255, -255))
                        _codeComment_AsText = "Accommodate for Deadzone Idle"
                        if (Math.abs(tilt_Pitch_Y_Motor_Neg255toPos255_Int) < tilt_DeadZone_Idle_XandY_NEG255_TO_POS255_INT) {
                            tilt_Pitch_Y_Motor_Neg255toPos255_Int = 0
                        }
                        if (Math.abs(tilt_Roll_X_Motor_Neg255toPos255_Int) < tilt_DeadZone_Idle_XandY_NEG255_TO_POS255_INT) {
                            tilt_Roll_X_Motor_Neg255toPos255_Int = 0
                        }
                        tilt_RollX_PitchY_Motor_Neg0toPos510_Dec = tilt_Roll_X_Motor_Neg255toPos255_Int + 255 + (tilt_Pitch_Y_Motor_Neg255toPos255_Int + 255) / 1000
                        radio.sendValue("ti_mo_xy", tilt_RollX_PitchY_Motor_Neg0toPos510_Dec)
                    }
                    if (true) {
                        led.unplot(tilt_Screen_X_0to4_Int, tilt_Screen_Y_0to4_Int)
                        tilt_Screen_X_0to4_Int = Math.round(Math.map(tilt_Roll_X_Raw_Neg60toPos60_Int, tilt_Raw_MIN_INT, tilt_Raw_MAX_INT, 0, 4))
                        tilt_Screen_Y_0to4_Int = Math.round(Math.map(tilt_Pitch_Y_Raw_Neg60toPos60_Int, tilt_Raw_MIN_INT, tilt_Raw_MAX_INT, 0, 4))
                        tilt_Screen_XY_0to4_Dec = tilt_Screen_X_0to4_Int + tilt_Screen_Y_0to4_Int / 10
                        radio.sendValue("ti_sc_xy", tilt_Screen_XY_0to4_Dec)
                        led.plotBrightness(tilt_Roll_X_Recenter_Raw_0to4_Int, tilt_Pitch_Y_Recenter_Raw_0to4_Int, screenBrightness_Lo_Int)
                        led.plotBrightness(tilt_Screen_X_0to4_Int, tilt_Screen_Y_0to4_Int, screenBrightness_Default_Int)
                    }
                    if (_debug_Serial_Print_Hi_Bool) {
                        integerIn_StringOut_FixedWidth_Fn(joystick_Tilt_X_Neg60toPos60_Int, 5, "a_jo60_X")
                        integerIn_StringOut_FixedWidth_Fn(joystick_Tilt_Y_Neg60toPos60_Int, 5, "a_jo60_Y")
                        integerIn_StringOut_FixedWidth_Fn(tilt_Roll_X_Raw_Neg60toPos60_Int, 5, "b_ti60_X")
                        integerIn_StringOut_FixedWidth_Fn(tilt_Pitch_Y_Raw_Neg60toPos60_Int, 5, "b_ti60_Y")
                        integerIn_StringOut_FixedWidth_Fn(tilt_Roll_X_Motor_Neg255toPos255_Int, 5, "c_ti255_X")
                        integerIn_StringOut_FixedWidth_Fn(tilt_Pitch_Y_Motor_Neg255toPos255_Int, 5, "c_ti255_Y")
                        integerIn_StringOut_FixedWidth_Fn(tilt_RollX_PitchY_Motor_Neg0toPos510_Dec, 10, "d_ti510_X.Y")
                        integerIn_StringOut_FixedWidth_Fn(tilt_Screen_X_0to4_Int, 5, "z_tiScr4_X")
                        integerIn_StringOut_FixedWidth_Fn(tilt_Screen_Y_0to4_Int, 5, "z_tiScr4_Y")
                        integerIn_StringOut_FixedWidth_Fn(tilt_Roll_X_Recenter_Raw_0to4_Int, 5, "y_tiCtr4_X")
                        integerIn_StringOut_FixedWidth_Fn(tilt_Pitch_Y_Recenter_Raw_0to4_Int, 5, "y_tiCtr4_Y")
                        serial.writeLine("")
                    }
                }
            }
            _codeComment_AsText = "Part 3of3: Main-Cycle-Post"
            if (true) {
                if (false) {
                    let network_Throttle_Controller_DelayPerCpuCycle_Int = 0
                    _codeComment_AsText = "Deactivate to prevent inducing any network lag"
                    _codeComment_AsText = "To not flood bot-server, add delay"
                    basic.pause(network_Throttle_Controller_DelayPerCpuCycle_Int)
                }
            }
        }
    }
})
basic.forever(function () {
    if (input.buttonIsPressed(Button.A) || input.buttonIsPressed(Button.B)) {
        if (_system_BotAndController_Mode_Int == _system_BotAndController_Mode_As_Command_AsDefault_Int) {
            _codeComment_AsText = "Do Nothing"
        } else {
            if (input.buttonIsPressed(Button.A)) {
                _system_BotAndController_Mode_Int += -1
                if (_system_BotAndController_Mode_Int < 1) {
                    _system_BotAndController_Mode_Int = _system_BotAndController_Mode_As_Config__MAX_INT
                }
            }
            if (input.buttonIsPressed(Button.B)) {
                _system_BotAndController_Mode_Int += 1
                if (_system_BotAndController_Mode_Int > _system_BotAndController_Mode_As_Config__MAX_INT) {
                    _system_BotAndController_Mode_Int = _system_BotAndController_Mode_As_Config_ChannelNum_Int
                }
            }
            if (_system_BotAndController_Mode_Int == _system_BotAndController_Mode_As_Config_ChannelNum_Int) {
                if (true) {
                    _codeComment_AsText = "Only Local Change to Prevent Accidental Remote Change of Other Devices w/ Same Original Value"
                    screen_Clear_Fn()
                    led.plot(4, 0)
                }
            } else if (_system_BotAndController_Mode_Int == _system_BotAndController_Mode_As_Config_Power_Slower_Int) {
                if (true) {
                    screen_Clear_Fn()
                    _codeComment_AsText = "By Changing Max Dynamically, Makes Gears Obsolete, Thus Simpler to Operate"
                    led.plot(4, 0)
                    led.plot(4, 1)
                }
            } else if (_system_BotAndController_Mode_Int == _system_BotAndController_Mode_As_Config_DebugMode_Int) {
                if (true) {
                    screen_Clear_Fn()
                    _codeComment_AsText = "By Changing Max Dynamically, Makes Gears Obsolete, Thus Simpler to Operate"
                    led.plot(4, 0)
                    led.plot(4, 1)
                    led.plot(4, 2)
                }
            } else {
                basic.showString("Error: configMode_Int: " + _system_BotAndController_Mode_Int)
            }
        }
        button_TriggerOnce_GivenRepeatTrigger_Fn()
    }
})
basic.forever(function () {
    if (deviceType_Controller_Bool && !(_system_Controller_UserInput_Tilt_Bool)) {
        if (true) {
            joystick_Raw_X_1to1023_Int = pins.analogReadPin(AnalogPin.P2)
            joystick_Raw_Y_1to1023_Int = pins.analogReadPin(AnalogPin.P1)
            joystick_Tilt_X_Neg512toPos512_Int = joystick_Raw_CENTER_X_INT - joystick_Raw_X_1to1023_Int
            joystick_Tilt_Y_Neg512toPos512_Int = joystick_Raw_Y_1to1023_Int - joystick_Raw_CENTER_Y_INT
            if (joystick_Tilt_X_Neg512toPos512_Int >= 0) {
                joystick_Tilt_X_Neg60toPos60_Int = Math.round(Math.map(joystick_Tilt_X_Neg512toPos512_Int, 0, joystick_Raw_CENTER_X_INT, 0, tilt_Raw_MAX_INT))
            } else {
                joystick_Tilt_X_Neg60toPos60_Int = Math.round(Math.map(joystick_Tilt_X_Neg512toPos512_Int, 0, -1 * joystick_Raw_CENTER_X_INT, 0, tilt_Raw_MIN_INT))
            }
            if (joystick_Tilt_Y_Neg512toPos512_Int >= 0) {
                joystick_Tilt_Y_Neg60toPos60_Int = Math.round(Math.map(joystick_Tilt_Y_Neg512toPos512_Int, 0, joystick_Raw_CENTER_Y_INT, 0, tilt_Raw_MAX_INT))
            } else {
                joystick_Tilt_Y_Neg60toPos60_Int = Math.round(Math.map(joystick_Tilt_Y_Neg512toPos512_Int, 0, -1 * joystick_Raw_CENTER_Y_INT, 0, tilt_Raw_MIN_INT))
            }
        }
    }
})
basic.forever(function () {
    if (deviceType_Bot_Bool) {
        compass_Current_Degrees = input.compassHeading()
    }
    if (compass_SteeringAssist_On_BoolInt == _bool_True_1_Int) {
        if (compass_Current_Degrees >= 23 && compass_Current_Degrees < 68) {
            led.plotBrightness(1, 1, screenBrightness_Lo_Int)
        } else if (compass_Current_Degrees < 113) {
            led.plotBrightness(1, 2, screenBrightness_Lo_Int)
        } else if (compass_Current_Degrees < 158) {
            led.plotBrightness(1, 3, screenBrightness_Lo_Int)
        } else if (compass_Current_Degrees < 203) {
            led.plotBrightness(2, 3, screenBrightness_Lo_Int)
        } else if (compass_Current_Degrees < 248) {
            led.plotBrightness(3, 3, screenBrightness_Lo_Int)
        } else if (compass_Current_Degrees < 293) {
            led.plotBrightness(3, 2, screenBrightness_Lo_Int)
        } else if (compass_Current_Degrees < 338) {
            led.plotBrightness(3, 1, screenBrightness_Lo_Int)
        } else {
            led.plotBrightness(2, 1, screenBrightness_Lo_Int)
        }
    }
})
basic.forever(function () {
    _codeComment_AsText = "DashboardDisplay: GroupChannel_Change_Mode"
    if (_system_BotAndController_Mode_Int == _system_BotAndController_Mode_As_Config_ChannelNum_Int) {
        if (true) {
            _codeComment_AsText = "Reserve Last Col as Config-Mode Header"
            _codeComment_AsText = "'groupChannel_Mine_Base1_Int' convert from Human-Base1 to XY-Base0"
            for (let index_X2 = 0; index_X2 <= 3; index_X2++) {
                for (let index_Y2 = 0; index_Y2 <= 4; index_Y2++) {
                    led.unplot(index_X2, index_Y2)
                }
            }
            for (let index = 0; index <= groupChannel_MyBot_Base0_Int - 1; index++) {
                led.plot(Math.idiv(index, 5), index % 5)
            }
        }
        if (GHBit.Button(GHBit.enButton.B1, GHBit.enButtonState.Press) || input.isGesture(Gesture.TiltLeft)) {
            groupChannel_MyBot_Base0_Int += -1
            if (groupChannel_MyBot_Base0_Int < 1) {
                groupChannel_MyBot_Base0_Int = groupChannel_MyBot_Base0_MAX_INT
            }
            button_TriggerOnce_GivenRepeatTrigger_Fn()
        }
        if (GHBit.Button(GHBit.enButton.B2, GHBit.enButtonState.Press) || input.isGesture(Gesture.TiltRight)) {
            groupChannel_MyBot_Base0_Int += 1
            if (groupChannel_MyBot_Base0_Int > groupChannel_MyBot_Base0_MAX_INT) {
                groupChannel_MyBot_Base0_Int = 1
            }
            button_TriggerOnce_GivenRepeatTrigger_Fn()
        }
    }
})
basic.forever(function () {
    _codeComment_AsText = "DashboardDisplay: PowerMax_Change_Mode"
    if (_system_BotAndController_Mode_Int == _system_BotAndController_Mode_As_Config_Power_Slower_Int) {
        if (true) {
            _codeComment_AsText = "Reserve Last Col as Config-Mode Header"
            for (let index_X3 = 0; index_X3 <= 3; index_X3++) {
                for (let index_Y3 = 0; index_Y3 <= 4; index_Y3++) {
                    led.unplot(index_X3, index_Y3)
                }
            }
            if (true) {
                _codeComment_AsText = "Replot Config Header, in case clobbered by another stack"
                led.plot(4, 0)
                led.plot(4, 1)
            }
            for (let index2 = 0; index2 <= Math.idiv(motor_Power_Slower_MAX_INT - motor_Power_Slower_L_Int, motor_Power_Slower_Delta_Int); index2++) {
                led.plot(1, 4 - index2)
            }
            for (let index3 = 0; index3 <= Math.idiv(motor_Power_Slower_MAX_INT - motor_Power_Slower_R_Int, motor_Power_Slower_Delta_Int); index3++) {
                led.plot(3, 4 - index3)
            }
        }
        if (true) {
            if (GHBit.Button(GHBit.enButton.B1, GHBit.enButtonState.Press)) {
                motor_Power_Slower_L_Int += 1 * motor_Power_Slower_Delta_Int
                if (motor_Power_Slower_L_Int > motor_Power_Slower_MAX_INT) {
                    _codeComment_AsText = "Since invalid value, undo value change"
                    motor_Power_Slower_L_Int = motor_Power_Slower_MAX_INT
                } else {
                    _codeComment_AsText = "If slowing the over-powering (OP) side, then other side (weaker) must - even unconditionally/forcefully - be at/forced to max, since do not want weaker side to be any weaker"
                    motor_Power_Slower_R_Int = motor_Power_Slower_MIN_INT
                    radio.sendValue("sl_set_r", motor_Power_Slower_MIN_INT)
                    radio.sendValue("sl_set_l", motor_Power_Slower_L_Int)
                }
                button_TriggerOnce_GivenRepeatTrigger_Fn()
            }
            if (GHBit.Button(GHBit.enButton.B2, GHBit.enButtonState.Press)) {
                motor_Power_Slower_L_Int += -1 * motor_Power_Slower_Delta_Int
                if (motor_Power_Slower_L_Int < motor_Power_Slower_MIN_INT) {
                    _codeComment_AsText = "Since invalid value, undo value change"
                    motor_Power_Slower_L_Int = motor_Power_Slower_MIN_INT
                } else {
                    radio.sendValue("sl_set_l", motor_Power_Slower_L_Int)
                }
                button_TriggerOnce_GivenRepeatTrigger_Fn()
            }
        }
        if (true) {
            if (GHBit.Button(GHBit.enButton.B3, GHBit.enButtonState.Press)) {
                motor_Power_Slower_R_Int += 1 * motor_Power_Slower_Delta_Int
                if (motor_Power_Slower_R_Int > motor_Power_Slower_MAX_INT) {
                    _codeComment_AsText = "Since invalid value, undo value change"
                    motor_Power_Slower_R_Int = motor_Power_Slower_MAX_INT
                } else {
                    _codeComment_AsText = "If slowing the over-powering (OP) side, then other side (weaker) must - even unconditionally/forcefully - be at/forced to max, since do not want weaker side to be any weaker"
                    motor_Power_Slower_L_Int = motor_Power_Slower_MIN_INT
                    radio.sendValue("sl_set_l", motor_Power_Slower_MIN_INT)
                    radio.sendValue("sl_set_r", motor_Power_Slower_R_Int)
                }
                button_TriggerOnce_GivenRepeatTrigger_Fn()
            }
            if (GHBit.Button(GHBit.enButton.B4, GHBit.enButtonState.Press)) {
                motor_Power_Slower_R_Int += -1 * motor_Power_Slower_Delta_Int
                if (motor_Power_Slower_R_Int < motor_Power_Slower_MIN_INT) {
                    _codeComment_AsText = "Since invalid value, undo value change"
                    motor_Power_Slower_R_Int = motor_Power_Slower_MIN_INT
                } else {
                    radio.sendValue("sl_set_r", motor_Power_Slower_R_Int)
                }
                button_TriggerOnce_GivenRepeatTrigger_Fn()
            }
        }
    }
})
basic.forever(function () {
    _codeComment_AsText = "DashboardDisplay: ConfigMode_Change_Mode"
    if (_system_BotAndController_Mode_Int == _system_BotAndController_Mode_As_Config_DebugMode_Int) {
        if (true) {
            if (_debug_Serial_Print_Hi_Bool) {
                led.plot(2, 2)
            } else {
                led.unplot(2, 2)
            }
        }
        if (GHBit.Button(GHBit.enButton.B1, GHBit.enButtonState.Press) || GHBit.Button(GHBit.enButton.B2, GHBit.enButtonState.Press)) {
            _debug_Serial_Print_Hi_Bool = !(_debug_Serial_Print_Hi_Bool)
            if (_debug_Serial_Print_Hi_Bool) {
                radio.sendValue("dbg_set", 1)
            } else {
                radio.sendValue("dbg_set", 0)
            }
            button_TriggerOnce_GivenRepeatTrigger_Fn()
        }
    }
})
