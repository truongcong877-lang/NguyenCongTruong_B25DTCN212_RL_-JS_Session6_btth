let totalContractRevenue = 0;
let totalBankRevenue = 0;
let transactionLog = "TX01:500000:SUCCESS|TX02:1200000:SUCCESS|TX03:800000:FAILED";

do {
    console.log(`
========================================
        FITNESS GYM - TÀI CHÍNH
========================================
1. Quyết toán hợp đồng gói tập
2. Đối soát giao dịch ngân hàng
3. Tra cứu giao dịch
4. Báo cáo quyết toán và thoát
========================================
`);

    const choice = prompt("Nhập lựa chọn: ").trim();

    switch (choice) {

        case "1":
            const sessionCount = Number(prompt("Nhập số buổi tập: ").trim());

            if (sessionCount <= 0 || isNaN(sessionCount)) {
                console.log("\nSố buổi phải lớn hơn 0!");
                break;
            }

            const pricePerSession = 350000;
            const originalAmount = sessionCount * pricePerSession;
            let discountRate = 0;

            if (sessionCount > 50) {
                discountRate = 0.20;
            } else if (sessionCount > 30) {
                discountRate = 0.10;
            }

            const discountAmount = originalAmount * discountRate;
            const amountAfterDiscount = originalAmount - discountAmount;
            const vat = amountAfterDiscount * 0.08;
            const finalAmount = amountAfterDiscount + vat;

            totalContractRevenue += finalAmount;

            console.log(`
========================================
        QUYẾT TOÁN HỢP ĐỒNG
========================================
Số buổi             : ${sessionCount}
Đơn giá/buổi        : ${pricePerSession} VNĐ
Tiền gốc            : ${originalAmount} VNĐ
Chiết khấu          : ${(discountRate * 100)}%
Tiền giảm           : ${discountAmount} VNĐ
Tiền sau giảm       : ${amountAfterDiscount} VNĐ
VAT                 : ${vat} VNĐ
----------------------------------------
THANH TOÁN          : ${finalAmount} VNĐ
========================================
`);

            break;

        case "2":
            totalBankRevenue = 0;

            let remaining = transactionLog;

            while (remaining.length > 0) {
                const separatorIndex = remaining.indexOf("|");
                let transaction;

                if (separatorIndex === -1) {
                    transaction = remaining;
                    remaining = "";
                } else {
                    transaction =
                        remaining.slice(0, separatorIndex);

                    remaining =
                        remaining.slice(separatorIndex + 1);
                }

                const firstColon = transaction.indexOf(":");
                const secondColon =
                    transaction.indexOf(":", firstColon + 1);

                if (firstColon === -1 || secondColon === -1) {
                    continue;
                }

                const transactionId = transaction.slice(0, firstColon);
                const amount = Number(transaction.slice(firstColon + 1, secondColon));
                const status =transaction.slice(secondColon + 1).trim().toUpperCase();

                if (transactionId !== "" && amount >= 0 && (status === "SUCCESS" || status === "FAILED")) {
                    if (status === "SUCCESS") {
                        totalBankRevenue += amount;
                    }
                }
            }

            console.log(`
========================================
        ĐỐI SOÁT GIAO DỊCH
========================================
Chuỗi giao dịch:
${transactionLog}

Tổng tiền thực thu:
${totalBankRevenue} VNĐ
========================================
`);

            break;

        case "3":
            const searchId = prompt("Nhập mã giao dịch cần tra cứu: ").trim().toUpperCase();
            let searchResult = "";
            let remainingSearch = transactionLog;

            while (remainingSearch.length > 0) {

                const separatorIndex = remainingSearch.indexOf("|");
                let transaction;

                if (separatorIndex === -1) {
                    transaction = remainingSearch;
                    remainingSearch = "";
                } else {
                    transaction =
                        remainingSearch.slice(
                            0,
                            separatorIndex
                        );

                    remainingSearch =
                        remainingSearch.slice(
                            separatorIndex + 1
                        );
                }

                const firstColon = transaction.indexOf(":");
                const secondColon = transaction.indexOf(":", firstColon + 1);

                if (firstColon === -1 || secondColon === -1) {
                    continue;
                }

                const transactionId = transaction.slice(0, firstColon).trim().toUpperCase();

                const amount = Number(transaction.slice(firstColon + 1, secondColon));
                const status = transaction.slice(secondColon + 1).trim().toUpperCase();
                if (transactionId === searchId) {
                    searchResult = `
Mã giao dịch : ${transactionId}
Số tiền      : ${amount} VNĐ
Trạng thái   : ${status}
`;
                    break;
                }
            }

            if (searchResult === "") {
                console.log(`
Không tìm thấy giao dịch:
${searchId}
`);
            } else {
                console.log(`
========================================
        TRA CỨU GIAO DỊCH
========================================
${searchResult}
========================================
`);
            }

            break;

        case "4":
            const grandTotal =totalContractRevenue + totalBankRevenue;
            const border = "=".repeat(50);
            const line = "-".repeat(50);

            console.log(`
${border}
        BÁO CÁO QUYẾT TOÁN TÀI CHÍNH
${border}
Doanh thu hợp đồng : ${totalContractRevenue} VNĐ
Doanh thu ngân hàng: ${totalBankRevenue} VNĐ
${line}
TỔNG DOANH THU     : ${grandTotal} VNĐ
${border}
Đã đóng ca quyết toán.
`);

            break;

        default:
            console.log(`
Lựa chọn không hợp lệ!
Vui lòng chọn từ 1 đến 4.
`);
    }

    if (choice === "4") {
        break;
    }

} while (true);