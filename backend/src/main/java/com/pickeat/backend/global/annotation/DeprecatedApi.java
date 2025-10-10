package com.pickeat.backend.global.annotation;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target({ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface DeprecatedApi {

    String since() default "";

    String sunset() default "";

    String alternateUrl() default "";
}
//@DeprecatedApi(
//        since = "2025-09",
//        sunset = "Fri, 28 Nov 2025 23:59:59 GMT",
//        alternateUrl = "/api/v2/rooms"
//)
