// 4 Seam 3Q/Standard
// Assuming the inputs are stored in variables like velo, spin, VerticalBreak, HorizontalBreak, ReleaseHeight, ReleaseSide, VAA, Efficiency, etc.
// Convert ReleaseHeight and ReleaseSide from feet to inches

const releaseHeightInches = ReleaseHeight * 12; // Convert feet to inches
const releaseSideInches = ReleaseSide * 12; // Convert feet to inches

// Apply the formula
const result = (0.5 * velo) +
    (spin > 2600 ? 7 :
        (spin < 2199 ? -3 :
            (spin >= 2199 && spin <= 2600 ? 3 : 0))) +
    (VerticalBreak > 21 ? 7 :
        (VerticalBreak < 15 ? -3 :
            (VerticalBreak >= 18 ? 3 : 0))) +
    (HorizontalBreak > 15 ? 5 :
        (HorizontalBreak <= 15 && HorizontalBreak > 12 ? 2 :
            (HorizontalBreak <= 12 && HorizontalBreak > 3 ? -1 :
                (HorizontalBreak <= 3 && HorizontalBreak > 0 ? 2 :
                    (HorizontalBreak <= 0 ? 9 : 0))))) +
    (0.13 * releaseHeightInches + 0.13 * releaseSideInches) +  // Using converted heights in inches
    Extension +
    (VAA > -3.7 ? 12 :
        (VAA <= -3.71 && VAA >= -4.93 ? 6 :
            (VAA <= -4.94 && VAA >= -6.35 ? 0 :
                (VAA <= -6.36 && VAA >= -7.71 ? 6 :
                    (VAA < -7.72 ? 12 : "Invalid Range")))));

// Output the result
console.log(result);


// 4 Seam Over Top
// Convert ReleaseHeight and ReleaseSide from feet to inches
// Convert ReleaseHeight and ReleaseSide from feet to inches
const releaseHeightInches = ReleaseHeight * 12; // Convert feet to inches
const releaseSideInches = ReleaseSide * 12; // Convert feet to inches

// Apply the formula
const result = (0.5 * velo) +
    (spin > 2600 ? 7 :
        (spin < 2199 ? -3 :
            (spin >= 2199 && spin <= 2600 ? 3 : 0))) +
    (VerticalBreak > 21 ? 7 :
        (VerticalBreak < 15 ? -3 :
            (VerticalBreak >= 15 && VerticalBreak < 18 ? 0 :
                (VerticalBreak >= 18 ? 3 : 0)))) +
    (HorizontalBreak > 15 ? 5 :
        (HorizontalBreak <= 15 && HorizontalBreak > 12 ? 2 :
            (HorizontalBreak <= 12 && HorizontalBreak > 3 ? -1 :
                (HorizontalBreak <= 3 && HorizontalBreak > 0 ? 2 :
                    (HorizontalBreak <= 0 ? 9 : 0))))) +
    (0.25 * releaseHeightInches - 0.15 * releaseSideInches) +  // Using converted heights in inches
    Extension +
    (VAA < 3.7 ? 12 :
        (VAA >= 3.71 && VAA <= 4.93 ? 6 :
            (VAA >= 4.94 && VAA <= 6.35 ? 0 :
                (VAA >= 6.36 && VAA <= 7.71 ? 6 :
                    (VAA > 7.72 ? 12 : "Invalid Range")))));

// Output the result
console.log(result);


// 4 seam Sidearm
// Convert ReleaseHeight and ReleaseSide from feet to inches
// Convert ReleaseHeight and ReleaseSide from feet to inches
const releaseHeightInches = ReleaseHeight * 12; // Convert feet to inches
const releaseSideInches = ReleaseSide * 12; // Convert feet to inches

// Apply the formula
const result = (0.5 * velo) +
    (spin > 2600 ? 7 :
        (spin < 2199 ? -3 :
            (spin >= 2199 && spin <= 2600 ? 3 : 0))) +
    (VerticalBreak > 21 ? 7 :
        (VerticalBreak < 15 ? -3 :
            (VerticalBreak >= 15 && VerticalBreak < 18 ? 0 :
                (VerticalBreak >= 18 ? 3 : 0)))) +
    (HorizontalBreak > 15 ? 5 :
        (HorizontalBreak <= 15 && HorizontalBreak > 12 ? 2 :
            (HorizontalBreak <= 12 && HorizontalBreak > 3 ? -1 :
                (HorizontalBreak <= 3 && HorizontalBreak > 0 ? 2 :
                    (HorizontalBreak <= 0 ? 9 : 0))))) +
    (0.25 * releaseHeightInches - 0.15 * releaseSideInches + 0.25 * releaseSideInches - 0.05 * releaseHeightInches) +  // Using converted heights in inches
    Extension +
    (VAA > -3.7 ? 12 :
        (VAA <= -3.71 && VAA >= -4.93 ? 6 :
            (VAA <= -4.94 && VAA >= -6.35 ? 0 :
                (VAA <= -6.36 && VAA >= -7.71 ? 6 :
                    (VAA < -7.72 ? 12 : "Invalid Range")))));

// Output the result
console.log(result);


// 2 Seam 3Q/Standard
// Convert ReleaseHeight and ReleaseSide from feet to inches
// Convert ReleaseHeight and ReleaseSide from feet to inches
const releaseHeightInches = ReleaseHeight * 12; // Convert feet to inches
const releaseSideInches = ReleaseSide * 12; // Convert feet to inches

// Apply the formula
const result = (0.65 * velo) +
    (spin >= 2600 ? 0 :
        (spin >= 2200 ? 2 :
            (spin >= 1800 ? 5 :
                (spin < 1800 ? 9 : 0)))) +
    (VerticalBreak > 10 ? -3 :
        (VerticalBreak > 5 ? 2 :
            (VerticalBreak > 0 ? 4 :
                (VerticalBreak > -6 ? 6 :
                    (VerticalBreak <= -6 ? 8 : 0))))) +
    (HorizontalBreak > 21 ? 8 :
        (HorizontalBreak > 18 ? 5 :
            (HorizontalBreak > 15 ? 2 :
                (HorizontalBreak <= 15 ? 0 : 0)))) +
    (0.075 * releaseSideInches + 0.075 * releaseHeightInches) +  // Assuming K5 = Efficiency and L5 = ReleaseHeight (converted to inches)
    Extension +
    (VAA > -3.7 ? 12 :
        (VAA > -4.93 ? 6 :
            (VAA > -6.35 ? 0 :
                (VAA > -7.71 ? 6 :
                    (VAA <= -7.71 ? 12 : 0)))));

// Output the result
console.log(result);


// 2 Seam Over Top
// Convert ReleaseHeight and ReleaseSide from feet to inches
const releaseHeightInches = ReleaseHeight * 12; // Convert feet to inches
const releaseSideInches = ReleaseSide * 12; // Convert feet to inches

// Apply the formula
const result = (0.65 * velo) +
    (spin >= 2600 ? 0 :
        (spin >= 2200 ? 2 :
            (spin >= 1800 ? 5 :
                (spin < 1800 ? 9 : 0)))) +
    (VerticalBreak > 10 ? -3 :
        (VerticalBreak > 5 ? 2 :
            (VerticalBreak > 0 ? 4 :
                (VerticalBreak > -6 ? 6 :
                    (VerticalBreak <= -6 ? 8 : 0))))) +
    (HorizontalBreak > 21 ? 8 :
        (HorizontalBreak > 18 ? 5 :
            (HorizontalBreak > 15 ? 2 :
                (HorizontalBreak <= 15 ? 0 : 0)))) +
    (0.25 * releaseSideInches - 0.15 * releaseHeightInches) +  // Assuming K5 = Efficiency and L5 = ReleaseHeight (converted to inches)
    Extension +
    (VAA > -3.7 ? 12 :
        (VAA > -4.93 ? 6 :
            (VAA > -6.35 ? 0 :
                (VAA > -7.71 ? 6 :
                    (VAA <= -7.71 ? 12 : 0)))));

// Output the result
console.log(result);


// 2 seam Sidearm
// Convert ReleaseHeight and ReleaseSide from feet to inches
const releaseHeightInches = ReleaseHeight * 12; // Convert feet to inches
const releaseSideInches = ReleaseSide * 12; // Convert feet to inches

// Apply the formula
const result = (0.65 * velo) +
    (spin >= 2600 ? 0 :
        (spin >= 2200 ? 2 :
            (spin >= 1800 ? 5 :
                (spin < 1800 ? 9 : 0)))) +
    (VerticalBreak > 10 ? -3 :
        (VerticalBreak > 5 ? 2 :
            (VerticalBreak > 0 ? 4 :
                (VerticalBreak > -6 ? 6 :
                    (VerticalBreak <= -6 ? 8 : 0))))) +
    (HorizontalBreak > 21 ? 8 :
        (HorizontalBreak > 18 ? 5 :
            (HorizontalBreak > 15 ? 2 :
                (HorizontalBreak <= 15 ? 0 : 0)))) +
    (0.25 * releaseHeightInches - 0.15 * releaseSideInches + 0.25 * releaseSideInches - 0.05 * releaseHeightInches) +  // Assuming L5 = ReleaseHeight and K5 = Efficiency
    Extension +
    (VAA > -3.7 ? 12 :
        (VAA > -4.93 ? 6 :
            (VAA > -6.35 ? 0 :
                (VAA > -7.71 ? 6 :
                    (VAA <= -7.71 ? 12 : 0)))));

// Output the result
console.log(result);


// Cutter
// Convert ReleaseHeight and ReleaseSide from feet to inches
const releaseHeightInches = ReleaseHeight * 12; // Convert feet to inches
const releaseSideInches = ReleaseSide * 12; // Convert feet to inches

// Apply the formula
const result = (0.6 * velo) +
    (spin > 2600 ? 20 :
        (spin <= 2600 && spin > 2200 ? 15 :
            (spin <= 2200 && spin > 1800 ? 10 :
                (spin <= 1800 && spin > 1400 ? 5 :
                    (spin <= 1400 ? -3 : 0))))) +
    (VerticalBreak < 6 ? 0 :
        (VerticalBreak >= 6 && VerticalBreak < 8 ? 5 :
            (VerticalBreak >= 8 && VerticalBreak < 10 ? 10 :
                (VerticalBreak >= 10 && VerticalBreak < 12 ? 15 :
                    (VerticalBreak >= 12 && VerticalBreak < 14 ? 18 :
                        (VerticalBreak >= 14 ? 20 : 0)))))) +
    (HorizontalBreak > -7 ? 10 :
        (HorizontalBreak <= -7 && HorizontalBreak > -9 ? 15 :
            (HorizontalBreak <= -9 && HorizontalBreak > -11 ? 5 :
                (HorizontalBreak <= -11 ? 0 : 0)))) +
    (0.1 * releaseSideInches + 0.1 * releaseHeightInches) +  // Assuming M6 = ReleaseSide and L6 = ReleaseHeight (converted to inches)
    (VAA < -4.02 ? -2 :
        (VAA >= -4.02 && VAA <= -5.8 ? 0 :
            (VAA >= -5.8 && VAA <= -7.65 ? 2 :
                (VAA >= -7.65 && VAA <= -9.5 ? 6 :
                    (VAA > -9.5 ? 10 : 0))))) +
    Extension;

// Output the result
console.log(result);


// Slutter
// Convert ReleaseHeight and ReleaseSide from feet to inches
const releaseHeightInches = ReleaseHeight * 12; // Convert feet to inches
const releaseSideInches = ReleaseSide * 12; // Convert feet to inches

// Apply the formula
const result = (0.5 * velo) +
    (spin > 2600 ? 20 :
        (spin <= 2600 && spin > 2200 ? 15 :
            (spin <= 2200 && spin > 1800 ? 10 :
                (spin <= 1800 && spin > 1400 ? 5 :
                    (spin <= 1400 ? -3 : 0))))) +
    (VerticalBreak < -4 ? 0 :
        (VerticalBreak >= -4 && VerticalBreak < 0 ? 5 :
            (VerticalBreak >= 0 && VerticalBreak < 3 ? 10 :
                (VerticalBreak >= 3 && VerticalBreak < 5.8 ? 15 :
                    (VerticalBreak >= 5.8 && VerticalBreak < 8 ? 10 :
                        (VerticalBreak >= 8 ? 0 : 0)))))) +
    (HorizontalBreak > -5 ? 5 :
        (HorizontalBreak <= -5 && HorizontalBreak > -3 ? 20 :
            (HorizontalBreak >= -3 && HorizontalBreak < -1 ? 15 :
                (HorizontalBreak <= -1 && HorizontalBreak > 1 ? 5 :
                    (HorizontalBreak >= 1 ? 0 : 0))))) +
    (0.1 * releaseSideInches + 0.1 * releaseHeightInches) +  // Assuming M7 = ReleaseSide and L7 = ReleaseHeight (converted to inches)
    (VAA < -4.02 ? -2 :
        (VAA >= -4.02 && VAA <= -5.8 ? 0 :
            (VAA >= -5.8 && VAA <= -7.65 ? 2 :
                (VAA >= -7.65 && VAA <= -9.5 ? 6 :
                    (VAA > -9.5 ? 10 : 0))))) +
    Extension;

// Output the result
console.log(result);


// Slider
// Convert ReleaseHeight and ReleaseSide from feet to inches
const releaseHeightInches = ReleaseHeight * 12; // Convert feet to inches
const releaseSideInches = ReleaseSide * 12; // Convert feet to inches

// Apply the formula
const result = (0.6 * velo) +
    (spin > 3000 ? 15 :
        (spin <= 3000 && spin > 2800 ? 10 :
            (spin <= 2800 && spin > 2600 ? 5 :
                (spin <= 2600 && spin > 2400 ? 0 :
                    (spin <= 2400 && spin > 2200 ? -1 :
                        (spin <= 2200 && spin > 2000 ? -2 :
                            (spin <= 2000 && spin > 1800 ? -3 :
                                (spin <= 1800 ? -4 : 0)))))))) +
    (VerticalBreak < -2 ? 4 :
        (VerticalBreak >= -2 && VerticalBreak < 2 ? 15 :
            (VerticalBreak >= 2 && VerticalBreak < 5 ? 8 :
                (VerticalBreak >= 5 ? 0 : 0)))) +
    (HorizontalBreak < -16 ? 20 :
        (HorizontalBreak >= -16 && HorizontalBreak > -12 ? 13 :
            (HorizontalBreak >= -12 && HorizontalBreak > -8 ? 6 :
                (HorizontalBreak >= -8 ? 0 : 0)))) +
    (0.1 * releaseSideInches + 0.1 * releaseHeightInches) +  // Assuming M8 = ReleaseSide and L8 = ReleaseHeight (converted to inches)
    (VAA < -4.02 ? -2 :
        (VAA >= -4.02 && VAA <= -5.8 ? 0 :
            (VAA >= -5.8 && VAA <= -7.65 ? 2 :
                (VAA >= -7.65 && VAA <= -9.5 ? 6 :
                    (VAA > -9.5 ? 10 : 0))))) +
    Extension;

// Output the result
console.log(result);


// Sweeper
// Convert ReleaseHeight and ReleaseSide from feet to inches
const releaseHeightInches = ReleaseHeight * 12; // Convert feet to inches
const releaseSideInches = ReleaseSide * 12; // Convert feet to inches

// Apply the formula
const result =
    (velo > 94 ? velo * 0.72 :
        (velo <= 94 && velo > 91 ? velo * 0.69 :
            (velo <= 91 && velo > 88 ? velo * 0.66 :
                (velo <= 88 && velo > 85 ? velo * 0.63 :
                    (velo <= 85 && velo > 82 ? velo * 0.6 :
                        (velo <= 82 && velo > 79 ? velo * 0.57 :
                            (velo <= 79 ? velo * 0.54 : 0))))))) +
    (spin > 2600 ? 15 :
        (spin <= 2600 && spin > 2500 ? 10 :
            (spin <= 2500 && spin > 2400 ? 5 :
                (spin <= 2400 && spin > 2200 ? 0 :
                    (spin <= 2200 ? -3 : 0))))) +
    (VerticalBreak < -3 ? 5 :
        (VerticalBreak >= -2 && VerticalBreak < -1 ? 10 :
            (VerticalBreak >= -1 && VerticalBreak < 1 ? 15 :
                (VerticalBreak >= 1 && VerticalBreak < 3 ? 10 :
                    (VerticalBreak >= 3 && VerticalBreak < 6 ? 5 :
                        (VerticalBreak >= 6 ? 0 : 0)))))) +
    (HorizontalBreak < -3 ? 15 :
        (HorizontalBreak >= -3 && HorizontalBreak < -1 ? 20 :
            (HorizontalBreak >= -1 && HorizontalBreak < 3 ? 15 :
                (HorizontalBreak >= 3 && HorizontalBreak < 5 ? 10 :
                    (HorizontalBreak >= 5 ? 0 : 0))))) +
    (0.1 * releaseSideInches + 0.1 * releaseHeightInches) +  // Assuming M10 = ReleaseSide and L10 = ReleaseHeight (converted to inches)
    (VAA < -4.02 ? -2 :
        (VAA >= -4.02 && VAA <= -5.8 ? 0 :
            (VAA >= -5.8 && VAA <= -7.65 ? 2 :
                (VAA >= -7.65 && VAA <= -9.5 ? 6 :
                    (VAA > -9.5 ? 10 : 0))))) +
    Extension;

// Output the result
console.log(result);


// Gyro Slider
// Convert ReleaseHeight and ReleaseSide from feet to inches
const releaseHeightInches = ReleaseHeight * 12; // Convert feet to inches
const releaseSideInches = ReleaseSide * 12; // Convert feet to inches

// Apply the formula
const result = (0.6 * velo) +
    (spin > 2600 ? 20 :
        (spin <= 2600 && spin > 2500 ? 15 :
            (spin <= 2500 && spin > 2400 ? 10 :
                (spin <= 2400 && spin > 2200 ? 5 :
                    (spin <= 2200 ? -3 : 0))))) +
    (VerticalBreak < -3 ? 5 :
        (VerticalBreak >= -2 && VerticalBreak < -1 ? 10 :
            (VerticalBreak >= -1 && VerticalBreak < 1 ? 15 :
                (VerticalBreak >= 1 && VerticalBreak < 3 ? 10 :
                    (VerticalBreak >= 3 && VerticalBreak < 6 ? 5 :
                        (VerticalBreak >= 6 ? 0 : 0)))))) +
    (HorizontalBreak < -3 ? 15 :
        (HorizontalBreak >= -3 && HorizontalBreak < -1 ? 20 :
            (HorizontalBreak >= -1 && HorizontalBreak < 3 ? 15 :
                (HorizontalBreak >= 3 && HorizontalBreak < 5 ? 10 :
                    (HorizontalBreak >= 5 ? 0 : 0))))) +
    (0.1 * releaseSideInches + 0.1 * releaseHeightInches) +  // Assuming M10 = ReleaseSide and L10 = ReleaseHeight (converted to inches)
    (VAA < -4.02 ? -2 :
        (VAA >= -4.02 && VAA <= -5.8 ? 0 :
            (VAA >= -5.8 && VAA <= -7.65 ? 2 :
                (VAA >= -7.65 && VAA <= -9.5 ? 6 :
                    (VAA > -9.5 ? 10 : 0))))) +
    Extension;

// Output the result
console.log(result);


// Slurve
// Convert ReleaseHeight and ReleaseSide from feet to inches
const releaseHeightInches = ReleaseHeight * 12; // Convert feet to inches
const releaseSideInches = ReleaseSide * 12; // Convert feet to inches

// Apply the formula
const result = (0.6 * velo) +
    (spin > 3100 ? 20 :
        (spin <= 3100 && spin > 2800 ? 15 :
            (spin <= 2800 && spin > 2500 ? 10 :
                (spin <= 2500 && spin > 2200 ? 5 :
                    (spin <= 2200 ? -3 : 0))))) +
    (VerticalBreak < -8 ? 5 :
        (VerticalBreak >= -8 && VerticalBreak < -4 ? 15 :
            (VerticalBreak >= -4 && VerticalBreak < 0 ? 10 :
                (VerticalBreak >= 0 ? 0 : 0)))) +
    (HorizontalBreak < -16 ? 20 :
        (HorizontalBreak >= -13 && HorizontalBreak < -10 ? 15 :
            (HorizontalBreak >= -10 && HorizontalBreak < -7 ? 10 :
                (HorizontalBreak >= -7 && HorizontalBreak < -4 ? 5 :
                    (HorizontalBreak >= -4 ? 0 : 0))))) +
    (0.05 * releaseSideInches + 0.05 * releaseHeightInches) +  // Assuming M11 = ReleaseSide and L11 = ReleaseHeight (converted to inches)
    (VAA < -4.02 ? -2 :
        (VAA >= -4.02 && VAA <= -5.8 ? 0 :
            (VAA >= -5.8 && VAA <= -7.65 ? 2 :
                (VAA >= -7.65 && VAA <= -9.5 ? 6 :
                    (VAA > -9.5 ? 10 : 0))))) +
    (Efficiency > 85 ? 0 :
        (Efficiency <= 85 && Efficiency > 80 ? 2 :
            (Efficiency <= 80 && Efficiency > 75 ? 6 :
                (Efficiency <= 75 && Efficiency > 70 ? 4 :
                    (Efficiency <= 70 && Efficiency > 65 ? 2 :
                        (Efficiency <= 65 && Efficiency > 0 ? 0 : 0)))))) +
    Extension;

// Output the result
console.log(result);


// Standard Curve
// Convert ReleaseHeight and ReleaseSide from feet to inches
const releaseHeightInches = ReleaseHeight * 12; // Convert feet to inches
const releaseSideInches = ReleaseSide * 12; // Convert feet to inches

// Apply the formula
const result = (0.6 * velo) +
    (spin > 2900 ? 20 :
        (spin <= 2900 && spin > 2600 ? 15 :
            (spin <= 2600 && spin > 2300 ? 10 :
                (spin <= 2300 && spin > 2000 ? 5 :
                    (spin <= 2000 ? -3 : 0))))) +
    (VerticalBreak > -6 ? 0 :
        (VerticalBreak <= -6 && VerticalBreak > -9 ? 5 :
            (VerticalBreak <= -9 && VerticalBreak > -12 ? 10 :
                (VerticalBreak <= -12 && VerticalBreak > -15 ? 15 :
                    (VerticalBreak <= -15 ? 7 : 0))))) +
    (HorizontalBreak > 0 ? 0 :
        (HorizontalBreak <= 0 && HorizontalBreak > -2 ? 5 :
            (HorizontalBreak <= -2 && HorizontalBreak > -5 ? 10 :
                (HorizontalBreak <= -5 && HorizontalBreak > -8 ? 15 :
                    (HorizontalBreak <= -8 ? 5 : 0))))) +
    (0.05 * releaseSideInches + 0.05 * releaseHeightInches) +  // Assuming M12 = ReleaseSide and L12 = ReleaseHeight (converted to inches)
    (VAA < -4.02 ? -2 :
        (VAA >= -4.02 && VAA <= -5.8 ? 0 :
            (VAA >= -5.8 && VAA <= -7.65 ? 2 :
                (VAA >= -7.65 && VAA <= -9.5 ? 6 :
                    (VAA > -9.5 ? 10 : 0))))) +
    (Efficiency > 75 ? 0 :
        (Efficiency <= 75 && Efficiency > 70 ? 2 :
            (Efficiency <= 70 && Efficiency > 65 ? 4 :
                (Efficiency <= 65 && Efficiency > 60 ? 6 :
                    (Efficiency <= 60 && Efficiency > 55 ? 4 :
                        (Efficiency <= 55 && Efficiency > 0 ? -2 : 0))))) +
    Extension);

// Output the result
console.log(result);


// 12-6 Curve
// Convert ReleaseHeight and ReleaseSide from feet to inches
const releaseHeightInches = ReleaseHeight * 12; // Convert feet to inches
const releaseSideInches = ReleaseSide * 12; // Convert feet to inches

// Apply the formula
const result = (0.6 * velo) +
    (spin > 2900 ? 20 :
        (spin <= 2900 && spin > 2600 ? 15 :
            (spin <= 2600 && spin > 2300 ? 10 :
                (spin <= 2300 && spin > 2000 ? 5 :
                    (spin <= 2000 ? -3 : 0))))) +
    (HorizontalBreak > -4 ? 15 :
        (HorizontalBreak <= -4 && HorizontalBreak > -6 ? 10 :
            (HorizontalBreak <= -6 && HorizontalBreak > -8 ? 5 :
                (HorizontalBreak <= -8 && HorizontalBreak > -10 ? 0 :
                    (HorizontalBreak <= -10 ? -2 : 0))))) +
    (VerticalBreak < -17 ? 20 :
        (VerticalBreak >= -17 && VerticalBreak < -13 ? 15 :
            (VerticalBreak >= -13 && VerticalBreak < -9 ? 10 :
                (VerticalBreak >= -9 && VerticalBreak < -5 ? 5 :
                    (VerticalBreak >= -5 ? 0 : 0))))) +
    (0.25 * releaseHeightInches - 0.15 * releaseSideInches) +  // Assuming L13 = ReleaseHeight and M13 = ReleaseSide (converted to inches)
    (VAA > -4.02 ? -2 :
        (VAA <= -4.02 && VAA > -5.8 ? 0 :
            (VAA <= -5.8 && VAA > -7.65 ? 2 :
                (VAA <= -7.65 && VAA > -9.5 ? 6 :
                    (VAA < -9.5 ? 10 : 0))))) +
    (Efficiency > 95 ? 8 :
        (Efficiency <= 95 && Efficiency > 90 ? 6 :
            (Efficiency <= 90 && Efficiency > 85 ? 4 :
                (Efficiency <= 85 && Efficiency > 80 ? 2 :
                    (Efficiency <= 80 && Efficiency > 75 ? 0 :
                        (Efficiency <= 75 && Efficiency > 0 ? -2 : 0))))) +
    Extension);

// Output the result
console.log(result);


// Gyro Curve
// Convert ReleaseHeight and ReleaseSide from feet to inches
const releaseHeightInches = ReleaseHeight * 12; // Convert feet to inches
const releaseSideInches = ReleaseSide * 12; // Convert feet to inches

// Apply the formula
const result = (0.6 * velo) +
    (spin > 2600 ? 20 :
        (spin <= 2600 && spin > 2200 ? 15 :
            (spin <= 2200 && spin > 1800 ? 10 :
                (spin <= 1800 && spin > 1400 ? 5 :
                    (spin <= 1400 ? -3 : 0))))) +
    (VerticalBreak > -4 ? 5 :
        (VerticalBreak <= -4 && VerticalBreak > -8 ? 20 :
            (VerticalBreak <= -8 && VerticalBreak > -12 ? 15 :
                (VerticalBreak <= -12 ? 0 : 0)))) +
    (HorizontalBreak < -6 ? 5 :
        (HorizontalBreak >= -6 && HorizontalBreak < -4 ? 15 :
            (HorizontalBreak >= -4 && HorizontalBreak < -2 ? 10 :
                (HorizontalBreak >= -2 && HorizontalBreak < 0 ? 5 :
                    (HorizontalBreak >= 0 ? 0 : 0))))) +
    (0.05 * releaseSideInches + 0.05 * releaseHeightInches) +  // Assuming M14 = ReleaseSide and L14 = ReleaseHeight (converted to inches)
    (VAA < -4.02 ? -2 :
        (VAA >= -4.02 && VAA <= -5.8 ? 0 :
            (VAA >= -5.8 && VAA <= -7.65 ? 2 :
                (VAA >= -7.65 && VAA <= -9.5 ? 6 :
                    (VAA > -9.5 ? 10 : 0))))) +
    (Efficiency < 25 ? 8 :
        (Efficiency >= 25 && Efficiency < 30 ? 6 :
            (Efficiency >= 30 && Efficiency < 35 ? 4 :
                (Efficiency >= 35 && Efficiency < 40 ? 2 :
                    (Efficiency >= 40 && Efficiency < 45 ? 0 :
                        (Efficiency >= 45 && Efficiency < 100 ? -2 : 0))))) +
    Extension);

// Output the result
console.log(result);


// Change-Up
// Convert ReleaseHeight and ReleaseSide from feet to inches
const releaseHeightInches = ReleaseHeight * 12; // Convert feet to inches
const releaseSideInches = ReleaseSide * 12; // Convert feet to inches

// Apply the formula
const result = (0.6 * velo) +
    (spin > 2500 ? 12 :
        (spin <= 2500 && spin > 1900 ? 0 :
            (spin <= 1900 && spin > 1700 ? 15 :
                (spin <= 1700 && spin > 1500 ? 20 :
                    (spin <= 1500 && spin > 1300 ? 12 :
                        (spin <= 1300 ? 5 : 0)))))) +
    (VerticalBreak > 10 ? 5 :
        (VerticalBreak <= 10 && VerticalBreak > 6 ? 20 :
            (VerticalBreak <= 6 && VerticalBreak > 3 ? 15 :
                (VerticalBreak <= 3 && VerticalBreak > 0 ? 10 :
                    (VerticalBreak <= 0 && VerticalBreak > -3 ? 5 :
                        (VerticalBreak <= -3 ? 0 : 0)))))) +
    (HorizontalBreak > 18 ? 20 :
        (HorizontalBreak <= 18 && HorizontalBreak > 16 ? 15 :
            (HorizontalBreak <= 16 && HorizontalBreak > 14 ? 10 :
                (HorizontalBreak <= 14 && HorizontalBreak > 11 ? 5 :
                    (HorizontalBreak <= 11 ? 0 : 0))))) +
    (0.1 * releaseSideInches + 0.1 * releaseHeightInches) +  // Assuming M15 = ReleaseSide and L15 = ReleaseHeight (converted to inches)
    Extension;

// Output the result
console.log(result);


// Splitter
// Convert ReleaseHeight and ReleaseSide from feet to inches
const releaseHeightInches = ReleaseHeight * 12; // Convert feet to inches
const releaseSideInches = ReleaseSide * 12; // Convert feet to inches

// Apply the formula
const result = (0.6 * velo) +
    (spin > 1000 ? 0 :
        (spin <= 1000 && spin > 800 ? 5 :
            (spin <= 800 && spin > 600 ? 10 :
                (spin <= 600 && spin > 400 ? 15 :
                    (spin <= 400 ? 20 : 0))))) +
    (VerticalBreak > 10 ? 5 :
        (VerticalBreak <= 10 && VerticalBreak > 6 ? 20 :
            (VerticalBreak <= 6 && VerticalBreak > 3 ? 15 :
                (VerticalBreak <= 3 && VerticalBreak > 0 ? 10 :
                    (VerticalBreak <= 0 && VerticalBreak > -3 ? 5 :
                        (VerticalBreak <= -3 ? 0 : 0)))))) +
    (HorizontalBreak > 10 ? 5 :
        (HorizontalBreak <= 10 && HorizontalBreak > 5 ? 10 :
            (HorizontalBreak <= 5 && HorizontalBreak > 0 ? 15 :
                (HorizontalBreak <= 0 && HorizontalBreak > -2 ? 5 :
                    (HorizontalBreak <= -2 ? 2 : 0))))) +
    (0.1 * releaseSideInches + 0.1 * releaseHeightInches) +  // Assuming M16 = ReleaseSide and L16 = ReleaseHeight (converted to inches)
    Extension;

// Output the result
console.log(result);
