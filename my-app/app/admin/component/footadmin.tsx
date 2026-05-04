"use client";

import Link from "next/link";
import {usePathname} from "next/navigation";
import React, { use } from "react";
import { useState, useEffect } from "react";
import "./navadmin.css";

export default function footAdmin() {
return (
    <div className="footer">
        © 2026 SIPMO TEAM. All rights reserved.
    </div>
)
}