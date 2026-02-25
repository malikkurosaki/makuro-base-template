makuro@srv442857:~/docker/prod/desa-plus-prod$ top -b -n1 | head -20
top - 11:38:26 up 2 days, 17:23,  2 users,  load average: 83.80, 82.50, 75.77
Tasks: 556 total,  13 running, 530 sleeping,   0 stopped,  13 zombie
%Cpu(s):  2.2 us,  3.0 sy,  0.3 ni,  9.5 id,  0.0 wa,  0.0 hi,  0.1 si, 84.9 st
MiB Mem :  32114.3 total,   4223.0 free,   7537.6 used,  20353.8 buff/cache
MiB Swap:  16384.0 total,  16383.0 free,      1.0 used.  23934.4 avail Mem 

    PID USER      PR  NI    VIRT    RES    SHR S  %CPU  %MEM     TIME+ COMMAND
    771 root      28   8 1311344  54620  13892 S  82.0   0.2 519:01.47 monarx-agent
1878784 makuro    20   0  690616  65252  49088 R  60.0   0.2   0:04.16 node
1879176 makuro    20   0   10508   4212   3188 R  60.0   0.0   0:00.49 top
1879183 root      20   0 1607164  12724   7984 R  40.0   0.0   0:00.20 runc:[2:INIT]
1857985 root      20   0  105264  14520   5484 R  38.0   0.0   2:05.97 apps.plugin
1879199 root      20   0   19516   2972   1876 S  38.0   0.0   0:00.19 systemd-udevd
3423232 root      20   0   72.1g 312344  68312 S  38.0   0.9 385:13.45 bun
1879186 makuro    20   0    5704   2904   2704 R  36.0   0.0   0:00.18 git
1879205 201       20   0       0      0      0 R  36.0   0.0   0:00.18 systemd-cat-nat
    938 root      20   0 1309180  84012  40180 R  22.0   0.3  31:34.29 PM2 v5.3.1: God
   1137 root      20   0   42.0g 187296  54800 S  20.0   0.6  93:42.04 next-router-wor
1688575 root      20   0       0      0      0 I  20.0   0.0   0:18.44 kworker/u16:7-flush-8:0
1733477 makuro    20   0 1558124 310656  85528 S  20.0   0.9  22:44.58 gitea
makuro@srv442857:~/docker/prod/desa-plus-prod$ 

makuro@srv442857:~/docker/prod/desa-plus-prod$ mpstat -P ALL 1 5
Linux 5.10.0-38-cloud-amd64 (srv442857) 	02/20/2026 	_x86_64_	(8 CPU)

11:39:07 AM  CPU    %usr   %nice    %sys %iowait    %irq   %soft  %steal  %guest  %gnice   %idle
11:39:08 AM  all    2.66    0.00    2.77    0.00    0.00    0.00   87.75    0.00    0.00    6.82
11:39:08 AM    0    2.94    0.00    2.94    0.00    0.00    0.00   94.12    0.00    0.00    0.00
11:39:08 AM    1    1.65    0.00    3.31    0.00    0.00    0.00   78.51    0.00    0.00   16.53
11:39:08 AM    2    1.00    0.00    4.00    0.00    0.00    0.00   95.00    0.00    0.00    0.00
11:39:08 AM    3    1.80    0.00    3.60    0.00    0.00    0.00   85.59    0.00    0.00    9.01
11:39:08 AM    4    2.02    0.00    2.02    0.00    0.00    0.00   95.96    0.00    0.00    0.00
11:39:08 AM    5    3.96    0.00    2.97    0.00    0.00    0.00   93.07    0.00    0.00    0.00
11:39:08 AM    6    5.94    0.00    0.99    0.00    0.00    0.00   93.07    0.00    0.00    0.00
11:39:08 AM    7    2.31    0.00    2.31    0.00    0.00    0.00   73.08    0.00    0.00   22.31

11:39:08 AM  CPU    %usr   %nice    %sys %iowait    %irq   %soft  %steal  %guest  %gnice   %idle
11:39:09 AM  all    3.10    0.00    2.86    0.00    0.00    0.00   89.40    0.00    0.00    4.64
11:39:09 AM    0    2.97    0.00    3.96    0.00    0.00    0.00   83.17    0.00    0.00    9.90
11:39:09 AM    1    3.92    0.00    2.94    0.00    0.00    0.00   93.14    0.00    0.00    0.00
11:39:09 AM    2    3.92    0.00    2.94    0.00    0.00    0.00   93.14    0.00    0.00    0.00
11:39:09 AM    3    3.60    0.00    1.80    0.00    0.00    0.00   85.59    0.00    0.00    9.01
11:39:09 AM    4    0.98    0.00    3.92    0.00    0.00    0.00   95.10    0.00    0.00    0.00
11:39:09 AM    5    1.67    0.00    3.33    0.00    0.00    0.00   79.17    0.00    0.00   15.83
11:39:09 AM    6    4.00    0.00    2.00    0.00    0.00    0.00   94.00    0.00    0.00    0.00
11:39:09 AM    7    3.92    0.00    1.96    0.00    0.00    0.00   94.12    0.00    0.00    0.00

11:39:09 AM  CPU    %usr   %nice    %sys %iowait    %irq   %soft  %steal  %guest  %gnice   %idle
11:39:10 AM  all    3.06    0.00    2.69    0.00    0.00    0.12   91.69    0.00    0.00    2.44
11:39:10 AM    0    1.98    0.00    2.97    0.00    0.00    0.00   95.05    0.00    0.00    0.00
11:39:10 AM    1    2.73    0.00    2.73    0.00    0.00    0.00   85.45    0.00    0.00    9.09
11:39:10 AM    2    2.97    0.00    1.98    0.00    0.00    0.00   95.05    0.00    0.00    0.00
11:39:10 AM    3    1.80    0.00    3.60    0.00    0.00    0.00   85.59    0.00    0.00    9.01
11:39:10 AM    4    2.20    0.00    3.30    0.00    0.00    0.00   94.51    0.00    0.00    0.00
11:39:10 AM    5    4.90    0.00    2.94    0.00    0.00    0.00   92.16    0.00    0.00    0.00
11:39:10 AM    6    4.95    0.00    1.98    0.00    0.00    0.00   93.07    0.00    0.00    0.00
11:39:10 AM    7    2.97    0.00    1.98    0.00    0.00    0.99   94.06    0.00    0.00    0.00

11:39:10 AM  CPU    %usr   %nice    %sys %iowait    %irq   %soft  %steal  %guest  %gnice   %idle
11:39:11 AM  all    2.95    0.24    2.72    1.06    0.00    0.00   88.55    0.00    0.00    4.49
11:39:11 AM    0    2.94    0.00    3.92    0.00    0.00    0.00   93.14    0.00    0.00    0.00
11:39:11 AM    1    1.68    0.00    2.52    0.00    0.00    0.00   79.83    0.00    0.00   15.97
11:39:11 AM    2    4.95    0.00    1.98    0.00    0.00    0.00   93.07    0.00    0.00    0.00
11:39:11 AM    3    3.92    0.00    2.94    0.00    0.00    0.00   93.14    0.00    0.00    0.00
11:39:11 AM    4    1.96    1.96    2.94    0.00    0.00    0.00   93.14    0.00    0.00    0.00
11:39:11 AM    5    2.97    0.00    1.98    0.00    0.00    0.00   95.05    0.00    0.00    0.00
11:39:11 AM    6    1.98    0.00    2.97    0.00    0.00    0.00   85.15    0.00    0.00    9.90
11:39:11 AM    7    3.36    0.00    2.52    7.56    0.00    0.00   78.99    0.00    0.00    7.56

11:39:11 AM  CPU    %usr   %nice    %sys %iowait    %irq   %soft  %steal  %guest  %gnice   %idle
11:39:12 AM  all    2.60    0.12    3.46    0.00    0.00    0.25   91.22    0.00    0.00    2.35
11:39:12 AM    0    2.97    0.00    3.96    0.00    0.00    0.00   93.07    0.00    0.00    0.00
11:39:12 AM    1    5.49    0.00    2.20    0.00    0.00    0.00   92.31    0.00    0.00    0.00
11:39:12 AM    2    1.00    0.00    4.00    0.00    0.00    1.00   94.00    0.00    0.00    0.00
11:39:12 AM    3    1.82    0.91    2.73    0.00    0.00    0.00   86.36    0.00    0.00    8.18
11:39:12 AM    4    1.98    0.00    3.96    0.00    0.00    0.00   94.06    0.00    0.00    0.00
11:39:12 AM    5    2.94    0.00    3.92    0.00    0.00    0.98   92.16    0.00    0.00    0.00
11:39:12 AM    6    3.23    0.00    3.23    0.00    0.00    0.00   93.55    0.00    0.00    0.00
11:39:12 AM    7    1.80    0.00    3.60    0.00    0.00    0.00   85.59    0.00    0.00    9.01

Average:     CPU    %usr   %nice    %sys %iowait    %irq   %soft  %steal  %guest  %gnice   %idle
Average:     all    2.87    0.07    2.90    0.22    0.00    0.07   89.69    0.00    0.00    4.19
Average:       0    2.76    0.00    3.55    0.00    0.00    0.00   91.72    0.00    0.00    1.97
Average:       1    2.95    0.00    2.76    0.00    0.00    0.00   85.27    0.00    0.00    9.02
Average:       2    2.78    0.00    2.98    0.00    0.00    0.20   94.05    0.00    0.00    0.00
Average:       3    2.57    0.18    2.94    0.00    0.00    0.00   87.16    0.00    0.00    7.16
Average:       4    1.82    0.40    3.23    0.00    0.00    0.00   94.55    0.00    0.00    0.00
Average:       5    3.23    0.00    3.04    0.00    0.00    0.19   89.92    0.00    0.00    3.61
Average:       6    4.03    0.00    2.22    0.00    0.00    0.00   91.73    0.00    0.00    2.02
Average:       7    2.84    0.00    2.49    1.60    0.00    0.18   84.37    0.00    0.00    8.53
makuro@srv442857:~/docker/prod/desa-plus-prod$ 

makuro@srv442857:~/docker/prod/desa-plus-prod$ mpstat 1 60
Linux 5.10.0-38-cloud-amd64 (srv442857) 	02/20/2026 	_x86_64_	(8 CPU)

11:39:46 AM  CPU    %usr   %nice    %sys %iowait    %irq   %soft  %steal  %guest  %gnice   %idle
11:39:47 AM  all    3.18    0.24    2.47    0.00    0.00    0.12   87.18    0.00    0.00    6.82
11:39:48 AM  all    2.82    0.11    2.82    0.00    0.00    0.00   85.67    0.00    0.00    8.58
11:39:49 AM  all    4.01    0.00    2.07    0.00    0.00    0.00   90.27    0.00    0.00    3.65
11:39:50 AM  all    2.13    0.12    2.96    0.00    0.00    0.24   88.65    0.00    0.00    5.91
11:39:51 AM  all    2.51    0.12    2.98    0.00    0.00    0.24   88.19    0.00    0.00    5.97
11:39:53 AM  all    3.01    0.32    2.36    0.00    0.00    0.00   86.90    0.00    0.00    7.41
11:39:54 AM  all    2.60    0.24    3.07    0.00    0.00    0.00   89.48    0.00    0.00    4.61
11:39:55 AM  all    3.10    0.00    3.22    0.00    0.00    0.12   91.30    0.00    0.00    2.26
11:39:56 AM  all    3.03    0.24    2.66    0.00    0.00    0.00   91.77    0.00    0.00    2.30
11:39:57 AM  all    2.54    0.24    2.90    0.00    0.00    0.00   88.04    0.00    0.00    6.28
11:39:58 AM  all    4.11    0.00    2.37    0.00    0.00    0.00   91.02    0.00    0.00    2.49
11:39:59 AM  all    2.45    0.23    2.69    0.00    0.00    0.00   88.79    0.00    0.00    5.84
11:40:00 AM  all    2.75    0.00    2.99    0.00    0.00    0.00   89.34    0.00    0.00    4.91
11:40:01 AM  all    2.65    0.23    2.88    0.00    0.00    0.12   87.33    0.00    0.00    6.80
11:40:02 AM  all    2.46    0.00    3.28    0.00    0.00    0.23   90.62    0.00    0.00    3.40
11:40:03 AM  all    2.21    0.25    2.70    0.12    0.00    0.12   91.17    0.00    0.00    3.44
11:40:04 AM  all    2.44    0.12    2.56    0.12    0.00    0.61   93.54    0.00    0.00    0.61
11:40:05 AM  all    2.56    0.23    3.48    0.00    0.00    0.23   85.95    0.00    0.00    7.55
11:40:06 AM  all    3.04    0.23    2.34    0.00    0.00    0.00   94.39    0.00    0.00    0.00
11:40:07 AM  all    3.32    0.00    3.06    0.00    0.00    0.26   89.80    0.00    0.00    3.57
11:40:08 AM  all    2.95    0.00    3.80    0.00    0.00    0.00   93.25    0.00    0.00    0.00
11:40:09 AM  all    3.17    0.00    2.69    0.00    0.00    0.00   92.92    0.00    0.00    1.22
11:40:10 AM  all    2.15    0.12    3.34    1.19    0.00    0.00   88.66    0.00    0.00    4.53
11:40:11 AM  all    3.26    0.12    2.42    0.00    0.00    0.00   90.57    0.00    0.00    3.63
^CAverage:     all    2.85    0.13    2.83    0.06    0.00    0.09   89.72    0.00    0.00    4.31
makuro@srv442857:~/docker/prod/desa-plus-prod$ 

makuro@srv442857:~/docker/prod/desa-plus-prod$ uptime
 11:40:40 up 2 days, 17:26,  2 users,  load average: 79.34, 81.22, 76.22
makuro@srv442857:~/docker/prod/desa-plus-prod$ 

makuro@srv442857:~/docker/prod/desa-plus-prod$ ps aux --sort=-%cpu | head
USER         PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND
makuro   1884026 61.6  0.3 739968 113440 ?       Rl   11:40   0:25 node --disallow-code-generation-from-strings --disable-proto=delete /usr/local/lib/node_modules/n8n/node_modules/.pnpm/@n8n+task-runner@file+packages+@n8n+task-runner_@opentelemetry+api@1.9.0_@opentelemetry_5147392a3f2dab4b87aa45b14b25796a/node_modules/@n8n/task-runner/dist/start.js
makuro   1885710 59.0  0.0  10244  3764 pts/0    R+   11:41   0:00 ps aux --sort=-%cpu
root     1885014 55.2  0.1  60672 47444 ?        R    11:40   0:10 /usr/bin/python3 /opt/seafile/seafile-server-11.0.13/seahub/manage.py send_file_updates
makuro   1733477 40.8  0.9 1558124 306568 ?      Ssl  10:42  23:51 /usr/local/bin/gitea web
root     1885677 39.0  0.0 1606652 14512 ?       Rsl  11:41   0:00 runc init
makuro   1805722 37.2  0.8 32915448 295928 ?     Sl   11:06  12:44 node /usr/local/bin/n8n
root     1885703 29.0  0.0 1607032 11816 ?       Rsl  11:41   0:00 runc init
201      1854943 24.0  0.2 947012 93740 ?        Ssl  11:27   3:11 /usr/sbin/netdata -u netdata -D -s /host -p 19999
root         868 22.5  0.4 6193976 149244 ?      Ssl  Feb17 886:31 /usr/bin/dockerd -H fd:// --containerd=/run/containerd/containerd.sock
makuro@srv442857:~/docker/prod/desa-plus-prod$ 

makuro@srv442857:~/docker/prod/desa-plus-prod$ systemd-detect-virt
kvm
makuro@srv442857:~/docker/prod/desa-plus-prod$ 

makuro@srv442857:~/docker/prod/desa-plus-prod$ lscpu
Architecture:                            x86_64
CPU op-mode(s):                          32-bit, 64-bit
Byte Order:                              Little Endian
Address sizes:                           52 bits physical, 57 bits virtual
CPU(s):                                  8
On-line CPU(s) list:                     0-7
Thread(s) per core:                      1
Core(s) per socket:                      8
Socket(s):                               1
NUMA node(s):                            1
Vendor ID:                               AuthenticAMD
CPU family:                              25
Model:                                   17
Model name:                              AMD EPYC 9354P 32-Core Processor
Stepping:                                1
CPU MHz:                                 3245.122
BogoMIPS:                                6490.24
Hypervisor vendor:                       KVM
Virtualization type:                     full
L1d cache:                               512 KiB
L1i cache:                               512 KiB
L2 cache:                                4 MiB
L3 cache:                                16 MiB
NUMA node0 CPU(s):                       0-7
Vulnerability Gather data sampling:      Not affected
Vulnerability Indirect target selection: Not affected
Vulnerability Itlb multihit:             Not affected
Vulnerability L1tf:                      Not affected
Vulnerability Mds:                       Not affected
Vulnerability Meltdown:                  Not affected
Vulnerability Mmio stale data:           Not affected
Vulnerability Reg file data sampling:    Not affected
Vulnerability Retbleed:                  Not affected
Vulnerability Spec rstack overflow:      Mitigation; safe RET
Vulnerability Spec store bypass:         Mitigation; Speculative Store Bypass disabled via prctl and seccomp
Vulnerability Spectre v1:                Mitigation; usercopy/swapgs barriers and __user pointer sanitization
Vulnerability Spectre v2:                Mitigation; Enhanced / Automatic IBRS, IBPB conditional, STIBP disabled, RSB filling, PBRSB-eIBRS Not affected
Vulnerability Srbds:                     Not affected
Vulnerability Tsa:                       Vulnerable: Clear CPU buffers attempted, no microcode
Vulnerability Tsx async abort:           Not affected
Vulnerability Vmscape:                   Not affected
Flags:                                   fpu vme de pse tsc msr pae mce cx8 apic sep mtrr pge mca cmov pat pse36 clflush mmx fxsr sse sse2 ht syscall nx mmxext fxsr_opt pdpe1gb rdtscp lm rep_good nopl cp
                                         uid extd_apicid tsc_known_freq pni pclmulqdq ssse3 fma cx16 pcid sse4_1 sse4_2 x2apic movbe popcnt tsc_deadline_timer aes xsave avx f16c rdrand hypervisor lahf_lm
                                          cmp_legacy cr8_legacy abm sse4a misalignsse 3dnowprefetch osvw perfctr_core invpcid_single ssbd ibrs ibpb stibp ibrs_enhanced vmmcall fsgsbase tsc_adjust bmi1 av
                                         x2 smep bmi2 erms invpcid avx512f avx512dq rdseed adx smap avx512ifma clflushopt clwb avx512cd sha_ni avx512bw avx512vl xsaveopt xsavec xgetbv1 xsaves avx512_bf16
                                          clzero xsaveerptr wbnoinvd arat avx512vbmi umip pku ospke avx512_vbmi2 gfni vaes vpclmulqdq avx512_vnni avx512_bitalg avx512_vpopcntdq rdpid overflow_recov succo
                                         r fsrm flush_l1d
makuro@srv442857:~/docker/prod/desa-plus-prod$ 