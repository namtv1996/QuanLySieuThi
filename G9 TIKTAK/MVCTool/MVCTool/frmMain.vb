Public Class frmMain

#Region "Declaration"

#End Region

#Region "Property"

#End Region

#Region "Contructor"

#End Region

#Region "Overrides"

#End Region

#Region "Private"
    Public Shared Sub InitGridDetailProperty(ByVal gridView As DevExpress.XtraGrid.Views.Grid.GridView)
        With gridView
            .OptionsView.ShowGroupPanel = False
            .OptionsView.ShowFooter = True
            .OptionsSelection.MultiSelect = False
            .OptionsMenu.EnableColumnMenu = False
            .OptionsMenu.EnableFooterMenu = False
            .OptionsMenu.EnableGroupPanelMenu = False
            .OptionsView.NewItemRowPosition = DevExpress.XtraGrid.Views.Grid.NewItemRowPosition.Bottom
            .OptionsView.ShowGroupPanel = False
            .OptionsBehavior.FocusLeaveOnTab = True
            .Appearance.SelectedRow.BackColor = Color.NavajoWhite
            .Appearance.SelectedRow.BackColor2 = Color.PapayaWhip
            .Appearance.FocusedCell.BackColor = Color.White
            .Appearance.FocusedCell.BackColor2 = Color.White
            .Appearance.FocusedRow.BackColor = Color.NavajoWhite
            .Appearance.FocusedRow.BackColor2 = Color.PapayaWhip
            .Appearance.FocusedRow.GradientMode = Drawing2D.LinearGradientMode.Vertical
            .Appearance.HideSelectionRow.BackColor = Color.NavajoWhite
            .Appearance.HideSelectionRow.BackColor2 = Color.PapayaWhip
            .Appearance.HideSelectionRow.ForeColor = Color.Black
            .Appearance.SelectedRow.ForeColor = Color.Black
            .Appearance.FocusedRow.ForeColor = Color.Black
            .Appearance.FocusedCell.ForeColor = Color.Black
        End With
    End Sub
#End Region

#Region "Event"
    Private Sub frmMain_Load(sender As Object, e As System.EventArgs) Handles Me.Load
        Try
            InitGridDetailProperty(gdvDetail)
            Dim sFileName As String = Application.StartupPath + "\" + "G9UPDATETIKTAC.xml"
            dsG9VC.ReadXml(sFileName, XmlReadMode.IgnoreSchema)
        Catch ex As Exception
            MessageBox.Show(ex.Message)
        End Try
    End Sub

    Private Sub btnClose_Click(sender As System.Object, e As System.EventArgs) Handles btnClose.Click
        Me.Close()
    End Sub

    Private Sub btnSave_Click(sender As System.Object, e As System.EventArgs) Handles btnSave.Click
        Try
            Dim sFileName As String = Application.StartupPath + "\" + "G9UPDATETIKTAC.xml"
            gdvDetail.UpdateCurrentRow()
            bsG9VC.EndEdit()
            dsG9VC.AcceptChanges()
            dsG9VC.WriteXml(sFileName, XmlWriteMode.WriteSchema)
            MessageBox.Show("Cất thành công.")
        Catch ex As Exception
            MessageBox.Show(ex.Message)
        End Try
    End Sub

    Private Sub btnDelete_Click(sender As System.Object, e As System.EventArgs) Handles btnDelete.Click
        Try
            Dim dr As DataRow = gdvDetail.GetFocusedDataRow
            If dr IsNot Nothing Then
                If MessageBox.Show("Bạn có thực sự muốn xóa không?", Application.ProductName, MessageBoxButtons.YesNo) = Windows.Forms.DialogResult.Yes Then
                    dr.Delete()
                End If
            End If
        Catch ex As Exception
            MessageBox.Show(ex.Message)
        End Try
    End Sub
#End Region
    
   
End Class