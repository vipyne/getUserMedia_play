; ModuleID = 'gify.c'
source_filename = "gify.c"
target datalayout = "e-m:e-p:32:32-i64:64-n32:64-S128"
target triple = "wasm32"

@gif.gif = internal global [76 x i8] c"GIF89a\0A\00\0A\00\91\00\00\FF\FF\FF\FF\00\00\00\00\FF\00\00\00,\00\00\00\00\0A\00\0A\00\00\02\16\8C-\99\87*\1C\DC3\A0\02u\EC\95\FA\A8\DE`\8C\04\91L\01\00!\01\05secret narf\00;", align 16

; Function Attrs: noinline nounwind optnone
define hidden i8* @gif() #0 {
  ret i8* getelementptr inbounds ([76 x i8], [76 x i8]* @gif.gif, i32 0, i32 0)
}

attributes #0 = { noinline nounwind optnone "correctly-rounded-divide-sqrt-fp-math"="false" "disable-tail-calls"="false" "less-precise-fpmad"="false" "min-legal-vector-width"="0" "no-frame-pointer-elim"="false" "no-infs-fp-math"="false" "no-jump-tables"="false" "no-nans-fp-math"="false" "no-signed-zeros-fp-math"="false" "no-trapping-math"="false" "stack-protector-buffer-size"="8" "target-cpu"="generic" "unsafe-fp-math"="false" "use-soft-float"="false" }

!llvm.module.flags = !{!0}
!llvm.ident = !{!1}

!0 = !{i32 1, !"wchar_size", i32 4}
!1 = !{!"clang version 9.0.1 "}
