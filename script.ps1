
  Get-ChildItem -Path HKLM:/SYSTEM/ControlSet001/Services/DeviceAssociationService/State/Store/ |
  ForEach-Object { $_.GetValue("Device") } |
  Select-String -Pattern Bluetooth
