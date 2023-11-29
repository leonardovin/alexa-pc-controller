Get-ChildItem -Path HKLM:\SYSTEM\ControlSet001\Services\DeviceAssociationService\State\Store\ | Select-String -Pattern Bluetooth
