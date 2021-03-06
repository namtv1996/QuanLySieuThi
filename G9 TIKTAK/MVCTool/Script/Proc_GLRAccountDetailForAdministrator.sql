/****** Object:  StoredProcedure [dbo].[Proc_GLRAccountDetailForAdministrator]    Script Date: 11/02/2016 13:45:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Create date: <Create Date,,>
-- Description:	<Sổ chi tiết các tài khoản mẫu quản trị>
-- [dbo].[Proc_GLRAccountDetailForAdministrator] '01/1/2013', '12/31/2013','911'
-- SELECT * FROM AccountingObject
-- =============================================
ALTER PROCEDURE [dbo].[Proc_GLRAccountDetailForAdministrator]
    @FromDate date ,
    @ToDate date,
    @AccountNumber NVARCHAR(20),
    @IsSummaryEntry BIT    
AS 
    BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
    SET NOCOUNT ON ;
    DECLARE @AccountNumberTemp NVARCHAR(20)
    SET @AccountNumberTemp = @AccountNumber + '%'
	SELECT NULL AS PostedDate,
            NEWID() AS VoucherID,
            '' AS VoucherNo ,            
            600 AS VoucherType,  
            AC.AccountCategoryKind,          
            N'Số dư đầu kỳ' AS [Description], 
            '' AS CorrespondingAccountNumber,   
            $0 AS DebitAmount,
            $0 AS CreditAmount,                               
            ISNULL(SUM(DebitAmount -CreditAmount),$0) AS ClosingDebitAmount,
            $0  AS ClosingCreditAmount 
    FROM dbo.GeneralLedger GL 
		INNER JOIN dbo.Account AC ON AC.AccountNumber = GL.AccountNumber
	WHERE GL.PostedDate < @FromDate AND GL.AccountNumber LIKE @AccountNumberTemp        
	GROUP BY AC.AccountCategoryKind
    UNION ALL  
    SELECT GL.PostedDate,	
			GL.VoucherID,	
			GL.VoucherNo,
			GL.VoucherType,	
			GL.AccountCategoryKind,		
			GL.Description,
			GL.CorrespondingAccountNumber,
			SUM(GL.DebitAmount) AS DebitAmount,
			SUM(GL.CreditAmount) AS CreditAmount,
			$0 AS ClosingDebitAmount,
			$0 AS ClosingCreditAmount
	FROM 
	(	        
		SELECT 
			GL.PostedDate,
			GL.VoucherID,		
			(CASE
				WHEN GL.VoucherType IN (51,61,200) THEN GL.InvNo
				WHEN ((GL.VoucherType >=50 AND GL.VoucherType <90) OR GL.VoucherType = 250) AND GL.VoucherType NOT IN (51,61,200) THEN	
					GL.CABAVoucherNo					
				ELSE
					GL.INVoucherNo	
			END) AS VoucherNo,
			GL.VoucherType,
			AC.AccountCategoryKind,
			(CASE WHEN @IsSummaryEntry = 1 THEN
				(CASE WHEN LEN(GL.CABAJournalMemo) > 0 THEN
					GL.CABAJournalMemo
				ELSE
					GL.INJournalMemo
				END)
			 ELSE GL.Description				
			END) AS Description,
			GL.CorrespondingAccountNumber,
			GL.DebitAmount,
			GL.CreditAmount,
			$0 AS ClosingDebitAmount,
			$0 AS ClosingCreditAmount
		FROM GeneralLedger GL 
			INNER JOIN dbo.Account AC ON AC.AccountNumber = GL.AccountNumber
		WHERE GL.AccountNumber LIKE @AccountNumberTemp
			AND GL.PostedDate BETWEEN @FromDate AND @ToDate	
		) GL
	GROUP BY GL.PostedDate,	
			 GL.VoucherID,	
			 GL.VoucherNo,
			GL.VoucherType,
			GL.AccountCategoryKind,
			GL.Description,
			GL.CorrespondingAccountNumber		
	ORDER BY PostedDate,VoucherType,VoucherNo
	  
    END
