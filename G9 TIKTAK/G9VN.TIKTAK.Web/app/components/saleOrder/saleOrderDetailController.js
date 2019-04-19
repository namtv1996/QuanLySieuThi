(function (app) {
    app.controller('saleOrderDetailController', saleOrderDetailController);
    saleOrderDetailController.$inject = ['$scope', 'apiService', 'notificationService', '$stateParams', '$ngBootbox'];
    function saleOrderDetailController($scope, apiService, notificationService, $stateParams, $ngBootbox) {
        //đơn đặt hàng
        $scope.saleOrders = {};
        //chi tiết đơn đặt hàng 
        $scope.saleOrdersDetail = {};
        //danh sach sp
        $scope.listItem = {};
        //list view
        $scope.listview = [];
        //trạng thái đơn hàng
        $scope.state = {};
        //phương thức tiếp nhận hàng (1: nhận tại cửa hàng, 2: giao hàng)
        $scope.method_of_receipt = 1;
        //phương thức thanh toán
        $scope.method_of_payment = 'tien-mat';
        //khách hàng
        $scope.customer = {};
        //hiển thị chức năng
        $scope.display = {}
        //thông tin phiếu thu
        $scope.receipt = {};
        // danh sach phiếu thu
        $scope.list_receipt = {};
        $scope.Infopay = {};
        //phiếu đóng gói
        $scope.pakage = {};
        $scope.itemOption = {
            Status: true
        }
        $scope.method_of_delivery = '';
        $scope.account = {};
        // thông tin tài khoản đăng nhập
        apiService.get('api/account/users', null, function (result) {
            $scope.account = result.data;
            apiService.get('api/branch/getbyid/' + $scope.account.BranchID, null, function (result) {
                $scope.account.BranchName = result.data.BranchName;
            });
        });

        $scope.limitChar = limitChar;
        function limitChar(str, limit) {
            if (str != null) {
                var cutString = str.slice(0, limit);
                if (str.length >= limit) {
                    str = cutString + '...';
                } else {
                    str = cutString
                }
                return str;
            }
            else {
                return "";
            }

            return str;
        }

        //hàm hiển thị các chức năng
        $scope.displayfunc = displayfunc

        $scope.delivery_voucher = {};

        $scope.CreateOrder = {
            token: "",
            PaymentTypeID: 1,
            FromDistrictID: null,
            FromWardCode: "",
            ToDistrictID: 1462,
            ToWardCode: "",
            Note: "",
            SealCode: "",
            ExternalCode: "",
            ClientContactName: "",
            ClientContactPhone: "",
            ClientAddress: "",
            CustomerName: "",
            CustomerPhone: "",
            ShippingAddress: "",
            CoDAmount: null,
            NoteCode: "",
            InsuranceFee: null,
            ClientHubID: null,
            ServiceID: null,
            ToLatitude: null,
            ToLongitude: null,
            FromLat: null,
            FromLng: null,
            Content: "",
            CouponCode: "",
            Weight: 0,
            Length: 0,
            Width: 0,
            Height: 0,
            CheckMainBankAccount: false,
            serviceID: null,
            ReturnContactName: "",
            ReturnContactPhone: "",
            ReturnAddress: "",
            ReturnDistrictCode: "",
            ExternalReturnCode: "",
            IsCreditCreate: true
        }
        $scope.transporter_list = [];
        $scope.Districts_list = [];
        $scope.Wards_list = [];
        $scope.Wards = [];
        $scope.getInfoDeliveryVoucher = getInfoDeliveryVoucher;
        $scope.GetWards = GetWards;
        $scope.Submit = Submit;
        //delivery_voucher.ObjectAddress
        var ix = 0;
        var ToWardCode = null;
        var ToDistrictID = null;
        function GetWards(pn, dn, idw) {
            ToDistrictID = idw;
            $scope.Districts = '' + dn + ' - ' + pn;
            for (var n = 0; n < $scope.Wards.length; n++) {
                if ($scope.Wards[n].DistrictID == idw) {
                    $scope.Wards_list.push($scope.Wards[n]);
                    ix++;
                }
            }
        }
        function Submit(code, name) {
            $scope.Wards1 = name;
            ToWardCode = code;
        }
        $scope.Usesignup = {
            token: null,
            Email: null,
            Password: null,
            ContactPhone: null,
            ContactName: null
        }
        $scope.NoteCode = [
            {
                name: 'CHOTHUHANG'
            }, {
                name: 'CHOXEMHANGKHONGTHU'
            }, {
                name: 'KHONGCHOXEMHANG'
            }
        ]
        $scope.ServiceList = [
            {
                id: 53319,
                name: '6 giờ',
                content: 'nội thành (nội vùng)'
            }, {
                id: 53320,
                name: '1 ngày',
                content: 'nội thành (nội vùng)'
            }, {
                id: 53330,
                name: 'Chuyển phát cá nhân tại điểm',
                content: 'nội thành (nội vùng)'
            }

        ]

        $scope.Usesignup = {
            token: null
        }
        $scope.GHNGetHubs = [];
        $scope.GetDelivery = GetDelivery;
        function GetDelivery() {
            apiService.get('api/Partner/getall', null, function (result) {
                $scope.listDelivery = result.data;
                for (i in $scope.listDelivery) {
                    if ($scope.listDelivery[i].PartnerName == 'GHN') {
                        $scope.Usesignup.Email = $scope.listDelivery[i].NameSignIn;
                        $scope.Usesignup.Password = $scope.listDelivery[i].PassSignIn;
                        apiService.post('api/transportpartners/GHNSignIn', $scope.Usesignup, function (result) {
                            var objsi = JSON.parse('' + result.data + '');
                            $scope.Usesignup.token = objsi.data.Token;
                            apiService.post('api/transportpartners/GHNGetHubs', $scope.Usesignup, function (result) {
                                var objgh = JSON.parse('' + result.data + '');
                                $scope.GHNGetHubs = objgh.data;
                            });

                        });
                    }
                }
            });
        }
        $scope.getHubs = getHubs;
        var ClientHubID = null;
        function getHubs(hubsId, disID, namehubs) {
            ClientHubID = hubsId;
            $scope.CreateOrder.FromDistrictID = disID;
            $scope.nameHuns = namehubs;
        }
        GetDelivery();

        function getInfoDeliveryVoucher() {
            apiService.get('api/transporter/getall', null, function (result) {
                $scope.transporter_list = result.data;
                $scope.delivery_voucher.TransporterID = $scope.transporter_list[0].ObjectID;
                $scope.delivery_voucher.TransporterName = $scope.transporter_list[0].ObjectName;
                $scope.delivery_voucher.contact = $scope.transporter_list[0].Tel;
                apiService.post('api/transportpartners/GHNGetDistricts', null, function (result) {
                    var obj = JSON.parse('' + result.data + '');
                    $scope.Districts_list = obj.data;
                    apiService.post('api/transportpartners/GHNGetWards', null, function (result) {
                        var objx = JSON.parse('' + result.data + '');
                        $scope.Wards = objx.data.Wards;
                    });

                });

            }, function (error) {
                console.log('transport failed');
            });
            $scope.delivery_voucher.VoucherNo = $scope.pakage[0].VoucherNo;
            $scope.delivery_voucher.OriginalVoucherNo = $scope.pakage[0].VoucherNo;
            $scope.delivery_voucher.VoucherDate = new Date();
            if ($scope.saleOrders.StatusID == 4) {
                $scope.delivery_voucher.TotalAmount = 0;
            }
            if ($scope.saleOrders.StatusID == 45) {
                $scope.delivery_voucher.TotalAmount = Currency($scope.Infopay.customerpay);
            }
            if ($scope.saleOrders.StatusID == 2) {
                $scope.delivery_voucher.TotalAmount = Currency(($scope.saleOrders.TotalAmountOC + $scope.saleOrders.TotalVATAmountOC
                    - $scope.saleOrders.DiscountAmountOC + $scope.saleOrders.ShippingAmount).toString());
            }
            $scope.delivery_voucher.ShippingAmount = Currency($scope.saleOrders.ShippingAmount.toString());
            $scope.delivery_voucher.ObjectID = $scope.saleOrders.ObjectID;
            $scope.delivery_voucher.ObjectName = $scope.customer.ObjectName;
            $scope.delivery_voucher.ObjectAddress = $scope.customer.ObjectAddress;
            $scope.delivery_voucher.ObjectTel = $scope.customer.Tel;
            $scope.delivery_voucher.BranchID = $scope.saleOrders.BranchID;
            $scope.delivery_voucher.StatusID = 0;
        }
        $scope.nametransport = '';
        $scope.changeTransporter = changeTransporter;
        function changeTransporter(id, NAME) {
            $scope.delivery_voucher.TransporterID = id;
            $scope.nametransport = NAME;
            apiService.get('api/transporter/getbyid/' + id, null, function (result) {
                $scope.delivery_voucher.TransporterID = id;
                $scope.delivery_voucher.TransporterName = result.data.ObjectName;
                $scope.delivery_voucher.contact = result.data.Tel;
            }, function (error) {
                console.log('transport failed');
            });
        }

        $scope.changeAmount = changeAmount;
        $scope.submit = submit;
        function submit(code) {
            if (code != undefined) {
                $scope.delivery_voucher.VoucherNo = code;
            }
            $scope.delivery_voucher.ObjectAddress = $scope.Districts;
            $scope.delivery_voucher.TotalAmount = Number(ConvertNumber($scope.delivery_voucher.TotalAmount));
            $scope.delivery_voucher.ShippingAmount = Number(ConvertNumber($scope.delivery_voucher.ShippingAmount));
            apiService.post('api/saleOrder/create_delivery', $scope.delivery_voucher, function (result) {
                if ($scope.saleOrders.StatusID == 4) {
                    $scope.saleOrders.StatusID = 1;
                    $scope.saleOrders.SortOrder = 2;
                }
                if ($scope.saleOrders.StatusID == 45) {
                    $scope.saleOrders.StatusID = 15;
                    $scope.saleOrders.SortOrder = 3;
                }
                if ($scope.saleOrders.StatusID == 2) {
                    $scope.saleOrders.StatusID = 3;
                    $scope.saleOrders.SortOrder = 1;
                }
                $scope.saleOrders.VoucherDate = new Date($scope.saleOrders.VoucherDate);
                apiService.put("api/saleOrder/update", $scope.saleOrders, function (result) {
                    $scope.displayfunc();
                });
                AddDeliveryVoucherDetail(0, result.data);


            }, function (error) {
                console.log('transport failed');
            });
        }
        function changeAmount() {
            if ($scope.delivery_voucher.ShippingAmount === undefined) {
                $scope.delivery_voucher.ShippingAmount = '0';
            } else {
                $scope.delivery_voucher.ShippingAmount = Currency(ConvertNumber($scope.delivery_voucher.ShippingAmount));
            }
            if ($scope.delivery_voucher.TotalAmount === undefined) {
                $scope.delivery_voucher.TotalAmount = '0';
            } else {
                $scope.delivery_voucher.TotalAmount = Currency(ConvertNumber($scope.delivery_voucher.TotalAmount));
            }
        }
        $scope.AddDeliveryVoucher = AddDeliveryVoucher;
        function AddDeliveryVoucher() {
            if ($scope.frmAddDeliveryVoucher.$valid == true) {
                if ($scope.nametransport == 'GHN') {
                    $scope.CreateOrder.ClientAddress = $scope.Districts;
                    $scope.CreateOrder.token = $scope.Usesignup.token;
                    $scope.CreateOrder.ToDistrictID = ToDistrictID;
                    $scope.CreateOrder.ToWardCode = ToWardCode;
                    $scope.CreateOrder.ClientContactName = $scope.delivery_voucher.ObjectName;
                    $scope.CreateOrder.ClientContactPhone = $scope.customer.Tel;
                    $scope.CreateOrder.ClientHubID = ClientHubID;
                    $scope.CreateOrder.CoDAmount = Number(ConvertNumber($scope.delivery_voucher.TotalAmount));
                    $scope.CreateOrder.Content = 'Đơn hàng tạo từ tiktac.vn';
                    $scope.CreateOrder.CouponCode = '';
                    $scope.CreateOrder.CustomerName = $scope.delivery_voucher.ObjectName;
                    $scope.CreateOrder.ExternalCode = $scope.delivery_voucher.VoucherNo;
                    $scope.CreateOrder.ExternalReturnCode = '';
                    $scope.CreateOrder.InsuranceFee = 0;
                    $scope.CreateOrder.Note = 'Đơn hàng tạo từ tiktac.vn';
                    $scope.CreateOrder.ReturnContactPhone = '';
                    $scope.CreateOrder.serviceID = 53321;
                    $scope.CreateOrder.SealCode = 'tem niêm phong';
                    $scope.CreateOrder.ReturnContactName = '';
                    $scope.CreateOrder.ReturnAddress = '';
                    apiService.post('api/transportpartners/GHNCreateOrder', $scope.CreateOrder, function (result) {
                        var objxx = JSON.parse('' + result.data + '');
                        if (objxx.msg == 'Success') {
                            submit(objxx.data.OrderCode);
                        } else {
                            console.log('transport failed');
                            notificationService.displayError();
                        }

                    }, function (error) {
                        console.log('transport failed');
                        notificationService.displayError(objxx.msg);
                    });
                } else {
                    submit();
                }

            } else {
                notificationService.displayWarning('Bạn cần nhập đầy đủ các mục dữ liệu bắt buộc !!');
            }
        }

        $scope.delivery_voucher_detail = [];
        $scope.AddDeliveryVoucherDetail = AddDeliveryVoucherDetail;
        function AddDeliveryVoucherDetail(i, item) {
            $scope.delivery_voucher_detail = $scope.saleOrdersDetail;
            if (i < $scope.saleOrdersDetail.length) {
                $scope.delivery_voucher_detail[i].VoucherID = item.VoucherID;
                apiService.post('api/saleOrderDetail/create', $scope.delivery_voucher_detail[i],
                    function (result) {
                        AddDeliveryVoucherDetail(i + 1, item);
                    },
                    function (error) {
                        console.log('Thêm mới chi tiết đóng gói không thành công');
                    }
                );
            } else {

                notificationService.displaySuccess('Đã tạo đơn giao hàng thành công  !');

                $scope.getInfo();
                //công nợ đối tác vận chuyển
                apiService.get('api/transporter/getbyid/' + $scope.delivery_voucher.TransporterID, null,
                    function (result) {
                        var tran = {};
                        tran = result.data;

                        tran.Debt = tran.Debt + Number($scope.delivery_voucher.TotalAmount) - Number($scope.delivery_voucher.ShippingAmount);
                        apiService.put('api/transporter/update', tran,
                            function (result) { },
                            function (error) {
                                console.log('update fail');
                            }
                        );
                    },
                    function (error) {
                        console.log('Thêm mới chi tiết đóng gói không thành công');
                    }
                );
            }
        }

        $scope.getSaleReturnBySaleOrder = getSaleReturnBySaleOrder;
        $scope.listSaleReturnBySaleOrder = [];
        function getSaleReturnBySaleOrder() {
            var config = {
                params: {
                    saleOrderVoucherNo: $scope.saleOrders.VoucherNo
                }
            }
            apiService.get('api/saleOrder/getSaleReturnBySaleOrderVoucherNo', config, function (result) {
                $scope.listSaleReturnBySaleOrder = result.data;
                if ($scope.listSaleReturnBySaleOrder <= 0) {
                    $scope.display.displayReturn = 'none';
                } else {
                    $scope.display.displayReturn = 'block';
                }
            }, function (error) {
                console.log(error.data);
            });
        }

        function displayfunc() {
            //hoàn thành
            if ($scope.saleOrders.StatusID == 1) {
                $scope.display.dis1 = 'none';
                $scope.display.dis2 = 'block';
                //thanh toán
                $scope.display.dis3 = 'block';
                $scope.display.dis4 = 'block';
                $scope.display.dis5 = 'block';
                $scope.display.dis7 = 'none';
                $scope.display.dis8 = 'none';
                $scope.display.dis9 = 'block';
                $scope.display.dis10 = 'none';
                $scope.style = 'col-md-12';
                if ($scope.pakage.length > 0) {
                    $scope.display.title = $scope.pakage[0].VoucherNo;
                } else {
                    $scope.display.title = 'Hoàn thành';
                }
                //nút hủy
                $scope.display.act = true;
                $scope.display.noclick1 = 'none';
                //nút sửa 
                $scope.display.act1 = true;
                $scope.display.noclick2 = 'none';
                $scope.display.icon = 'available';
                $scope.state.title = 'Hoàn thành';
                //icon
                $scope.display.icon1 = 'fa fa-check-circle';
                $scope.display.icon2 = 'fa fa-check-circle';
                $scope.display.icon3 = 'fa fa-spinner';
                //hiển thị các thao tác 
                $scope.display.task = 'block';
                //phương thức vận chuyển

                $scope.display.dis11 = 'none';
                $scope.display.dis12 = 'none';
                $scope.display.import = 'block';
                $scope.display.dis13 = 'block';
            }
            //đóng gói xuất kho thanh toán 1 phần
            if ($scope.saleOrders.StatusID == 15) {
                $scope.display.dis1 = 'none';
                $scope.display.dis2 = 'block';
                //thanh toán
                $scope.display.dis3 = 'block';
                $scope.display.dis4 = 'block';
                $scope.display.dis5 = 'block';
                $scope.display.dis7 = 'none';
                $scope.display.dis8 = 'none';
                $scope.display.dis9 = 'block';
                $scope.display.dis10 = 'block';
                $scope.style = 'col-md-8';
                if ($scope.pakage.length > 0) {
                    $scope.display.title = $scope.pakage[0].VoucherNo;
                } else {
                    $scope.display.title = 'Hoàn thành';
                }
                //nút hủy
                $scope.display.act = true;
                $scope.display.noclick1 = 'none';
                $scope.display.act1 = true;
                $scope.display.noclick2 = 'none';
                $scope.display.icon = 'available';
                $scope.state.title = 'Đang giao dịch';
                //icon
                $scope.display.icon1 = 'fa fa-check-circle';
                $scope.display.icon2 = 'fa fa-spinner';
                $scope.display.icon3 = 'fa fa-spinner';
                //hiển thị các thao tác 
                $scope.display.task = 'block';
                $scope.display.dis11 = 'none';
                $scope.display.dis12 = 'none';
                $scope.display.import = 'block';

                $scope.display.dis13 = 'block';
            }
            //đóng gói
            if ($scope.saleOrders.StatusID == 2) {
                $scope.display.dis1 = 'none';
                $scope.display.dis2 = 'block';
                $scope.display.dis3 = 'block';
                $scope.display.dis4 = 'none';
                $scope.display.dis5 = 'none';
                $scope.display.dis7 = 'none';
                $scope.display.dis8 = 'block';
                $scope.display.dis9 = 'block';
                $scope.display.dis10 = 'block';
                $scope.style = 'col-md-8';
                if ($scope.pakage.length > 0) {
                    $scope.display.title = $scope.pakage[0].VoucherNo;
                } else {
                    $scope.display.title = 'Hoàn thành';
                }
                $scope.display.act = false;
                $scope.display.noclick1 = '';
                $scope.display.act1 = false;
                $scope.display.noclick2 = '';
                $scope.display.icon = 'available';
                $scope.state.title = 'Đang giao dịch';
                //icon
                $scope.display.icon1 = 'fa fa-spinner';
                $scope.display.icon2 = 'fa fa-spinner';
                $scope.display.icon3 = 'fa fa-spinner';
                //hiển thị các thao tác 
                $scope.display.task = 'block';
                $scope.display.dis11 = 'none';
                $scope.display.dis12 = 'block';
                $scope.display.import = 'none';

                $scope.display.dis13 = 'none';
            }
            //đóng gói, xuất kho
            if ($scope.saleOrders.StatusID == 3) {
                $scope.display.dis1 = 'none';
                $scope.display.dis2 = 'block';
                $scope.display.dis3 = 'block';
                $scope.display.dis4 = 'block';
                $scope.display.dis5 = 'block';
                $scope.display.dis7 = 'none';
                $scope.display.dis8 = 'none';
                $scope.display.dis9 = 'block';
                $scope.display.dis10 = 'block';
                $scope.style = 'col-md-8';
                if ($scope.pakage.length > 0) {
                    $scope.display.title = $scope.pakage[0].VoucherNo;
                } else {
                    $scope.display.title = 'Hoàn thành';
                }
                $scope.display.icon = 'available';
                $scope.display.act = true;
                $scope.display.noclick1 = 'none';
                $scope.display.act1 = true;
                $scope.display.noclick2 = 'none';
                $scope.state.title = 'Đang giao dịch';
                //icon
                $scope.display.icon1 = 'fa fa-check-circle';
                $scope.display.icon2 = 'fa fa-spinner';
                $scope.display.icon3 = 'fa fa-spinner';
                //hiển thị các thao tác 
                $scope.display.task = 'block';
                $scope.display.dis11 = 'none';
                $scope.display.dis12 = 'none';
                $scope.display.import = 'block';
                $scope.display.dis13 = 'block';
            }
            //đóng gói thanh toán
            if ($scope.saleOrders.StatusID == 4) {
                $scope.display.dis1 = 'none';
                $scope.display.dis2 = 'block';
                $scope.display.dis3 = 'block';
                $scope.display.dis4 = 'none';
                $scope.display.dis5 = 'none';
                $scope.display.dis7 = 'none';
                $scope.display.dis8 = 'block';
                $scope.display.dis9 = 'block';
                $scope.display.dis10 = 'none';
                $scope.style = 'col-md-12';
                if ($scope.pakage.length > 0) {
                    $scope.display.title = $scope.pakage[0].VoucherNo;
                } else {
                    $scope.display.title = 'Hoàn thành';
                }
                $scope.display.act = false;
                $scope.display.noclick1 = '';
                $scope.display.act1 = false;
                $scope.display.noclick2 = '';
                $scope.display.icon = 'available';
                $scope.state.title = 'Đang giao dịch';
                //icon
                $scope.display.icon1 = 'fa fa-spinner';
                $scope.display.icon2 = 'fa fa-check-circle';
                $scope.display.icon3 = 'fa fa-spinner';
                //hiển thị các thao tác 
                $scope.display.task = 'block';
                $scope.display.dis11 = 'none';
                $scope.display.dis12 = 'block';
                $scope.display.import = 'none';
                $scope.display.dis13 = 'none';
            }
            //đóng gói thanh toán 1phần
            if ($scope.saleOrders.StatusID == 45) {
                $scope.display.dis1 = 'none';
                $scope.display.dis2 = 'block';
                $scope.display.dis3 = 'block';
                $scope.display.dis4 = 'none';
                $scope.display.dis5 = 'none';
                $scope.display.dis7 = 'none';
                $scope.display.dis8 = 'block';
                $scope.display.dis9 = 'block';
                $scope.display.dis10 = 'block';
                $scope.style = 'col-md-8';
                if ($scope.pakage.length > 0) {
                    $scope.display.title = $scope.pakage[0].VoucherNo;
                } else {
                    $scope.display.title = 'Hoàn thành';
                }
                $scope.display.act = false;
                $scope.display.noclick1 = '';
                $scope.display.act1 = false;
                $scope.display.noclick2 = '';
                $scope.display.icon = 'available';
                $scope.state.title = 'Đang giao dịch';
                //icon
                $scope.display.icon1 = 'fa fa-spinner';
                $scope.display.icon2 = 'fa fa-spinner';
                $scope.display.icon3 = 'fa fa-spinner';
                //hiển thị các thao tác 
                $scope.display.task = 'block';
                $scope.display.dis11 = 'none';
                $scope.display.dis12 = 'block';
                $scope.display.import = 'none';
                $scope.display.dis13 = 'none';
            }
            //đặt hàng
            if ($scope.saleOrders.StatusID === 7) {
                $scope.display.dis1 = 'block';
                $scope.display.dis2 = 'none';
                $scope.display.dis3 = 'none';
                $scope.display.dis4 = 'none';
                $scope.display.dis5 = 'none';
                $scope.display.dis9 = 'block';
                $scope.display.icon = 'not-available';
                $scope.state.title = 'Đặt hàng';
                $scope.display.act = false;
                $scope.display.noclick1 = '';
                $scope.display.act1 = false;
                $scope.display.noclick2 = '';
                //icon
                $scope.display.icon1 = 'fa fa-spinner';
                $scope.display.icon2 = 'fa fa-spinner';
                $scope.display.icon3 = 'fa fa-spinner';
                //hiển thị các thao tác 
                $scope.display.task = 'none';
                $scope.display.dis11 = 'block';
                $scope.display.dis12 = 'none';
                $scope.display.import = 'none';
                $scope.display.dis13 = 'none';
            }
            //sau khi duyệt đơn chuyển sang trạng thái đang giao dịch
            if ($scope.saleOrders.StatusID == 8) {
                $scope.display.dis1 = 'none';
                $scope.display.dis2 = 'block';
                $scope.display.dis3 = 'block';
                $scope.display.dis4 = 'none';
                $scope.display.dis5 = 'none';
                $scope.display.dis7 = 'block';
                $scope.display.dis8 = 'none';
                $scope.display.dis9 = 'block';
                $scope.display.dis10 = 'block';
                $scope.style = 'col-md-8';
                $scope.display.title = 'Chưa đóng gói';
                $scope.display.act = false;
                $scope.display.noclick1 = '';
                $scope.display.act1 = false;
                $scope.display.noclick2 = '';
                $scope.display.icon = 'available';
                $scope.state.title = 'Đang giao dịch';
                //icon
                $scope.display.icon1 = 'fa fa-spinner';
                $scope.display.icon2 = 'fa fa-spinner';
                $scope.display.icon3 = 'fa fa-spinner';
                //hiển thị các thao tác 
                $scope.display.task = 'block';
                $scope.display.dis11 = 'block';
                $scope.display.dis12 = 'none';
                $scope.display.import = 'none';
                $scope.display.dis13 = 'none';
            }

            //thanh toán nhưng chưa đóng gói xuất kho
            if ($scope.saleOrders.StatusID == 9) {
                $scope.display.dis1 = 'none';
                $scope.display.dis2 = 'block';
                $scope.display.dis3 = 'block';
                $scope.display.dis4 = 'none';
                $scope.display.dis5 = 'none';
                $scope.display.dis7 = 'block';
                $scope.display.dis8 = 'none';
                $scope.display.dis9 = 'block';
                $scope.style = 'col-md-12';
                $scope.display.dis10 = 'none';
                $scope.display.title = 'Chưa đóng gói';
                $scope.display.act = false;
                $scope.display.noclick1 = '';
                $scope.display.act1 = false;
                $scope.display.noclick2 = '';
                $scope.display.icon = 'available';
                $scope.state.title = 'Đang giao dịch';
                //icon
                $scope.display.icon1 = 'fa fa-spinner';
                $scope.display.icon2 = 'fa fa-check-circle';
                $scope.display.icon3 = 'fa fa-spinner';
                //hiển thị các thao tác 
                $scope.display.task = 'block';
                $scope.display.dis11 = 'block';
                $scope.display.dis12 = 'none';
                $scope.display.import = 'none';
                $scope.display.dis13 = 'none';
            }
            //thanh toán 1phần nhưng chưa đóng gói xuất kho
            if ($scope.saleOrders.StatusID == 95) {
                $scope.display.dis1 = 'none';
                $scope.display.dis2 = 'block';
                $scope.display.dis3 = 'block';
                $scope.display.dis4 = 'none';
                $scope.display.dis5 = 'none';
                $scope.display.dis7 = 'block';
                $scope.display.dis8 = 'none';
                $scope.display.dis9 = 'block';
                $scope.display.dis10 = 'block';
                $scope.style = 'col-md-8';
                $scope.display.title = 'Chưa đóng gói';
                $scope.display.act = false;
                $scope.display.noclick1 = '';
                $scope.display.act1 = false;
                $scope.display.noclick2 = '';
                $scope.display.icon = 'available';
                $scope.state.title = 'Đang giao dịch';
                //icon
                $scope.display.icon1 = 'fa fa-spinner';
                $scope.display.icon2 = 'fa fa-spinner';
                $scope.display.icon3 = 'fa fa-spinner';
                //hiển thị các thao tác 
                $scope.display.task = 'block';
                $scope.display.dis11 = 'block';
                $scope.display.dis12 = 'none';
                $scope.display.import = 'none';
                $scope.display.dis13 = 'none';
            }
            //hủy đơn hàng
            if ($scope.saleOrders.StatusID == 10) {
                $scope.display.dis1 = 'none';
                $scope.display.dis2 = 'none';
                $scope.display.dis3 = 'none';
                $scope.display.dis4 = 'none';
                $scope.display.dis5 = 'none';
                $scope.display.dis7 = 'none';
                $scope.display.dis8 = 'none';
                //hiển thị các nút in, hủy, sửa đơn hàng
                $scope.display.dis9 = 'none';
                $scope.display.title = 'Chưa đóng gói';
                $scope.display.act = true;
                $scope.display.noclick1 = 'none';
                $scope.display.act1 = true;
                $scope.display.noclick2 = 'none';
                $scope.display.icon = 'red';
                $scope.state.title = 'Đã hủy';
                //hiển thị các thao tác 
                $scope.display.task = 'block';
                $scope.display.dis13 = 'none';
            }
            //tra hàng
            if ($scope.saleOrders.StatusID == 11) {
                $scope.display.dis1 = 'none';
                $scope.display.dis2 = 'block';
                $scope.display.dis3 = 'block';
                $scope.display.dis4 = 'none';
                $scope.display.dis5 = 'none';
                $scope.display.dis7 = 'none';
                $scope.display.dis8 = 'none';
                $scope.display.dis10 = 'none';
                //hiển thị các nút in, hủy, sửa đơn hàng
                $scope.display.dis9 = 'none';
                $scope.display.title = 'Trả hàng';
                $scope.display.act = true;
                $scope.display.noclick1 = 'none';
                $scope.display.act1 = true;
                $scope.display.noclick2 = 'none';
                $scope.display.icon = 'black';
                $scope.state.title = 'Đã trả';
                //icon
                $scope.display.icon1 = 'fa fa-check-circle';
                $scope.display.icon2 = 'fa fa-spinner';
                $scope.display.icon3 = 'fa fa-check-circle';
                //hiển thị các thao tác 
                $scope.display.task = 'block';

                if ($scope.pakage.length > 0) {
                    $scope.display.title = $scope.pakage[0].VoucherNo;
                } else {
                    $scope.display.title = 'Hoàn thành';
                }
                $scope.display.dis11 = 'none';
                $scope.display.dis12 = 'none';
                $scope.display.import = 'block';
                $scope.display.dis13 = 'block';
            }

            if ($scope.saleOrders.SortOrder === 0) {
                $scope.display.delivery = 'none';
                $scope.display.cod = 'none';
            } else {
                if ($scope.saleOrders.SortOrder === 1) {
                    $scope.display.delivery = 'block';
                    $scope.display.cod = 'block';
                    $scope.display.dis12 = 'none';
                    $scope.display.dis10 = 'none';
                    $scope.display.import = 'none';
                }
                if ($scope.saleOrders.SortOrder === 2) {
                    $scope.display.delivery = 'block';
                    $scope.display.cod = 'none';
                    $scope.display.dis12 = 'none';
                    $scope.display.dis10 = 'none';
                    $scope.display.import = 'none';
                }
                if ($scope.saleOrders.SortOrder === 3) {
                    $scope.display.delivery = 'block';
                    $scope.display.cod = 'block';
                    $scope.display.dis12 = 'none';
                    $scope.display.dis10 = 'none';
                    $scope.display.import = 'none';
                }
            }
        }
        ///hàm lấy thông tin cần thiết cho view chi tiết

        $scope.getInfo = function () {
            $scope.saleOrdersDetail = {};
            //lấy thông tin chi tiết đơn hàng
            apiService.get('api/saleOrderDetail/getbyid/' + $stateParams.id, null, function (result) {
                $scope.saleOrdersDetail = result.data;
            });
            //lấy thông tin đơn đặt hàng
            apiService.get('api/saleOrder/getbyid/' + $stateParams.id, null, function (result) {
                $scope.saleOrders = result.data;
                $scope.state.title = "Đặt hàng";
                if ($scope.listview.length == 0) {
                    //lấy danh sách sp có trong đơn hàng 
                    apiService.get('api/itemOption/getitemsaleinvoice1/' + $scope.saleOrders.VoucherID, null, function (result1) {
                        $scope.listview = result1.data;
                    });
                }
                // lấy thông tin khách hàng
                apiService.get('api/Customer/getbyid/' + $scope.saleOrders.ObjectID, null, function (result) {
                    $scope.customer = result.data;
                    $scope.customer.ObjectAddress_StringCut = limitChar($scope.customer.ObjectAddress, 25);
                    $scope.customer.Email_StringCut = limitChar($scope.customer.Email, 25);

                    $scope.selectDistrict();
                    $scope.selectTown();
                    //lấy thông tin thanh toán
                    apiService.get('api/saleOrder/getbyoriginalvoucherno?originalvoucherno=' + $scope.saleOrders.VoucherNo, null, function (result) {
                        //danh sách phiếu thu theo chứng từ gốc
                        $scope.list_receipt = result.data;
                        //số tiền đã thu
                        $scope.Infopay.customerpaid = 0;
                        for (var index in $scope.list_receipt) {
                            $scope.Infopay.customerpaid += $scope.list_receipt[index].TotalAmountOC;
                            $scope.list_receipt[index].sort = Number(index) + Number(1);
                            if ($scope.list_receipt[index].VoucherType == 20) {
                                $scope.list_receipt[index].method_of_payment = 'Tiền mặt'
                            }
                            if ($scope.list_receipt[index].VoucherType == 21) {
                                $scope.list_receipt[index].method_of_payment = 'COD'
                            }
                            if ($scope.list_receipt[index].VoucherType == 22) {
                                $scope.list_receipt[index].method_of_payment = 'Chuyển khoản'
                            }
                        }
                        //số tiền khách phải trả
                        $scope.Infopay.customerpay = $scope.saleOrders.TotalAmountOC - $scope.Infopay.customerpaid - $scope.saleOrders.DiscountAmountOC + $scope.saleOrders.TotalVATAmountOC + $scope.saleOrders.ShippingAmount;
                        //input tiền thanh toán
                        $scope.Infopay.txt_customerpay = Currency($scope.Infopay.customerpay);
                    });

                    $scope.getSaleReturnBySaleOrder();
                });
                //thông tin phiếu đóng gói
                apiService.get('api/saleOrder/getpackagebyoriginalvoucherno?originalvoucherno=' + $scope.saleOrders.VoucherNo, null, function (result1) {
                    $scope.pakage = result1.data;
                    if ($scope.saleOrders.SortOrder !== 0) {
                        apiService.get('api/saleOrder/getDeliveryOrderByPackageVoucherNo?packageVoucherNo=' + $scope.pakage[0].VoucherNo, null, function (result1) {
                            $scope.saleOrders.delivery_voucher_id = result1.data[0].VoucherID;
                            if (result1.data[0].StatusID === 0) {
                                $scope.delivery_status = 'Sử dụng giao hàng - ' + result1.data[0].VoucherNo + ' - Đang giao hàng';
                            }
                            if (result1.data[0].StatusID === 1) {
                                $scope.delivery_status = 'Sử dụng giao hàng - ' + result1.data[0].VoucherNo + ' - Hoàn thành';
                            }
                            if (result1.data[0].StatusID === 4) {
                                $scope.delivery_status = 'Sử dụng giao hàng - ' + result1.data[0].VoucherNo + ' - Hủy giao hàng';
                            }
                            if (result1.data[0].StatusID === 2 || result1.data[0].StatusID === 3) {
                                $scope.delivery_status = 'Sử dụng giao hàng - ' + result1.data[0].VoucherNo + ' - Đã giao hàng';
                            }
                        });
                    }

                    $scope.displayfunc();

                });
            }, function (error) {
                notificationService.displayError("Đơn hàng không tồn tại");
            });
        }
        //thêm mới chi tiết đóng gói
        $scope.AddPackingSlipssDetail = AddPackingSlipssDetail;
        function AddPackingSlipssDetail(i, item) {
            if (i < $scope.saleOrdersDetail.length) {
                $scope.saleOrdersDetail[i].VoucherID = item.VoucherID;
                apiService.post('api/saleOrderDetail/create', $scope.saleOrdersDetail[i],
                    function (result) {
                        AddPackingSlipssDetail(i + 1, item);
                    },
                    function (error) {
                        notificationService.displayError('Thêm mới chi tiết đóng gói không thành công');
                    });
            } else {
                $scope.getInfo();
            }
        }
        //thêm mới phiếu đóng gói

        $scope.AddPackingSlips = AddPackingSlips;
        function AddPackingSlips() {
            $scope.saleOrders.VoucherType = 30;
            $scope.saleOrders.OriginalVoucherNo = $scope.saleOrders.VoucherNo;

            $scope.saleOrders.StatusID = 0;
            apiService.post('api/saleOrder/create_package', $scope.saleOrders, function (result) {

                AddPackingSlipssDetail(0, result.data);
            }, function (error) {
                notificationService.displayError('Thêm mới phiếu đóng gói không thành công');
            });
        }

        //duyệt đơn
        $scope.Revise = function (param) {
            $scope.saleOrders.VoucherDate = new Date($scope.saleOrders.VoucherDate);
            if (param == 'duyet_don') {
                $scope.saleOrders.StatusID = 8;
                $scope.state.title = "Đang giao dịch";
                ///gọi  api update lại trạng thái cho đơn hàng                   
                apiService.put("api/saleOrder/update", $scope.saleOrders, function (result) {
                    //gọi hàm hiển thị chức năng
                    $scope.displayfunc();
                });

                notificationService.displaySuccess('Duyệt đơn hàng thành công!');
                //báo cáo công nợ khách hàng(duyệt đơn thì công nợ tăng lên)
                var customer = {};
                apiService.get('api/Customer/getbyid/' + $scope.saleOrders.ObjectID, null,
                    function (result) {
                        customer = result.data;

                        if (customer.ObjectID === $scope.saleOrders.ObjectID) {
                            customer.Debt = customer.Debt + $scope.saleOrders.TotalAmount + $scope.saleOrders.TotalVATAmount - $scope.saleOrders.DiscountAmount + $scope.saleOrders.ShippingAmount;

                            apiService.put('api/Customer/update', customer
                            );
                        }
                    }, function (error) {
                        notificationService.displayError('Thất bại !!');
                    }
                );
            }
            if (param == 'dong_goi') {

                if ($scope.saleOrders.StatusID == 7) {
                    //gán lại trạng thái
                    $scope.saleOrders.StatusID = 2;
                    ///gọi  api update lại trạng thái cho đơn hàng
                    apiService.put("api/saleOrder/update", $scope.saleOrders, function (result) {
                        AddPackingSlips();

                    });

                    //gọi hàm hiển thị chức năng
                    $scope.displayfunc();
                    notificationService.displaySuccess('Đã đóng gói!');
                }
                if ($scope.saleOrders.StatusID == 8) {
                    //gán lại trạng thái
                    $scope.saleOrders.StatusID = 2;
                    ///gọi  api update lại trạng thái cho đơn hàng
                    apiService.put("api/saleOrder/update", $scope.saleOrders, function (result) {
                        AddPackingSlips();

                    });
                    //gọi hàm hiển thị chức năng
                    $scope.displayfunc();
                    notificationService.displaySuccess('Đã đóng gói!');
                }
                if ($scope.saleOrders.StatusID == 9) {
                    //gán lại trạng thái
                    $scope.saleOrders.StatusID = 4;
                    ///gọi  api update lại trạng thái cho đơn hàng
                    apiService.put("api/saleOrder/update", $scope.saleOrders, function (result) {
                        AddPackingSlips();

                    });

                    //gọi hàm hiển thị chức năng
                    $scope.displayfunc();
                    notificationService.displaySuccess('Đã đóng gói!');
                }
                if ($scope.saleOrders.StatusID == 95) {
                    //gán lại trạng thái
                    $scope.saleOrders.StatusID = 45;
                    ///gọi  api update lại trạng thái cho đơn hàng
                    apiService.put("api/saleOrder/update", $scope.saleOrders, function (result) {
                        AddPackingSlips();

                    });

                    //gọi hàm hiển thị chức năng
                    $scope.displayfunc();
                    notificationService.displaySuccess('Đã đóng gói!');
                }
            }
            if (param == 'xuat_kho') {

                if ($scope.saleOrders.StatusID == 4) {
                    //gán lại trạng thái
                    $scope.saleOrders.StatusID = 1
                    ///gọi  api update lại trạng thái cho đơn hàng

                    apiService.put("api/saleOrder/update", $scope.saleOrders, function (result) {
                    });
                    //gọi hàm hiển thị chức năng
                    $scope.displayfunc();
                    notificationService.displaySuccess('Đã xuất kho!');
                }
                if ($scope.saleOrders.StatusID == 45) {
                    //gán lại trạng thái
                    $scope.saleOrders.StatusID = 15;
                    ///gọi  api update lại trạng thái cho đơn hàng

                    apiService.put("api/saleOrder/update", $scope.saleOrders, function (result) {
                    });
                    //gọi hàm hiển thị chức năng
                    $scope.displayfunc();
                    notificationService.displaySuccess('Đã xuất kho!');
                }
                if ($scope.saleOrders.StatusID == 2) {
                    //gán lại trạng thái
                    $scope.saleOrders.StatusID = 3;
                    ///gọi  api update lại trạng thái cho đơn hàng
                    apiService.put("api/saleOrder/update", $scope.saleOrders, function (result) {
                    });
                    //gọi hàm hiển thị chức năng
                    $scope.displayfunc();
                    notificationService.displaySuccess('Đã xuất kho!');
                }

                //cập nhật tồn kho của các tùy chọn theo đơn hàng tương ứng với chi nhánh của tk đăng nhập
                var param = {
                    BranchID: $scope.account.BranchID,
                    voucherID: $scope.saleOrders.VoucherID
                };
                apiService.put('api/stock/updateClosingQuantityStockCombo', param);
                apiService.put('api/saleOrder/UpdateInventory', param, function (result) {
                }, function (error) {
                    console.log = 'không update đk số lượng ^^';
                });
                //update trạng thái đơn đóng gói
                $scope.package.StatusID = 1;
                apiService.put("api/saleOrder/update", $scope.package, function (result) {
                });
            }
            //thanh toan
            if (param == 'thanh_toan') {
                //phương thức thanh toán
                if ($scope.method_of_payment == 'tien-mat') {
                    $scope.receipt.VoucherType = 20;
                }
                if ($scope.method_of_payment == 'cod') {
                    $scope.receipt.VoucherType = 21;
                }
                if ($scope.method_of_payment == 'chuyen-khoan') {
                    $scope.receipt.VoucherType = 22;
                }

                //người trả
                $scope.receipt.ObjectID = $scope.saleOrders.ObjectID;
                $scope.receipt.BillPaid = 1;
                $scope.receipt.DiscountRate = 0;
                $scope.receipt.DiscountAmountOC = 0;
                $scope.receipt.DiscountAmount = 0;
                //số tiền trả
                $scope.Infopay.txt_customerpay = ConvertNumber($scope.Infopay.txt_customerpay);
                $scope.receipt.TotalAmountOC = $scope.Infopay.txt_customerpay;
                $scope.receipt.TotalAmount = $scope.receipt.TotalAmountOC;
                $scope.receipt.TotalDiscountAmountOC = 0;
                $scope.receipt.TotalDiscountAmount = 0;
                $scope.receipt.TotalVATAmountOC = 0;
                $scope.receipt.TotalVATAmount = 0;
                $scope.receipt.TotalOutwardAmount = 0;
                $scope.receipt.IsPosted = 1;
                $scope.receipt.SortOrder = 1;
                $scope.receipt.CommisionAmountOC = 0;
                $scope.receipt.CommisionAmount = 0;
                $scope.receipt.IsAttachList = 0;
                $scope.receipt.IsShowUnitConvert = 0;
                $scope.receipt.StatusID = 0;
                $scope.receipt.OriginalVoucherNo = $scope.saleOrders.VoucherNo;
                $scope.receipt.BranchID = $scope.account.BranchID;
                $scope.receipt.VoucherDate = new Date();
                if ($scope.saleOrders.StatusID == 45) {
                    if (Number($scope.Infopay.customerpaid) + Number($scope.Infopay.txt_customerpay) == Number($scope.saleOrders.TotalAmountOC - $scope.saleOrders.DiscountAmountOC + $scope.saleOrders.ShippingAmount + $scope.saleOrders.TotalVATAmountOC)) {
                        //gán lại trạng thái
                        $scope.saleOrders.StatusID = 4;
                    }
                    else {
                        $scope.saleOrders.StatusID = 45;
                    }
                    ///gọi  api update lại trạng thái cho đơn hàng
                    apiService.put("api/saleOrder/update", $scope.saleOrders, function (result) {
                        apiService.post('api/saleOrder/create_receipt', $scope.receipt,
                            function (result) {
                                notificationService.displaySuccess('Thanh toán thành công');
                                $scope.getInfo();
                            },
                            function (error) {
                                notificationService.displayError('Thanh toán không thành công');
                            });
                    });


                }
                if ($scope.saleOrders.StatusID == 95) {
                    if (Number($scope.Infopay.customerpaid) + Number($scope.Infopay.txt_customerpay) == Number($scope.saleOrders.TotalAmountOC - $scope.saleOrders.DiscountAmountOC + $scope.saleOrders.ShippingAmount + $scope.saleOrders.TotalVATAmountOC)) {
                        //gán lại trạng thái
                        $scope.saleOrders.StatusID = 9;
                    }
                    else {
                        $scope.saleOrders.StatusID = 95;
                    }
                    ///gọi  api update lại trạng thái cho đơn hàng
                    apiService.put("api/saleOrder/update", $scope.saleOrders, function (result) {
                        apiService.post('api/saleOrder/create_receipt', $scope.receipt,
                            function (result) {
                                notificationService.displaySuccess('Thanh toán thành công');
                                $scope.getInfo();
                            },
                            function (error) {
                                notificationService.displayError('Thanh toán không thành công');
                            });
                    });


                }
                if ($scope.saleOrders.StatusID == 15) {
                    // thanh toán đủ đơn hàng hoàn thành
                    if (Number($scope.Infopay.customerpaid) + Number($scope.Infopay.txt_customerpay) == Number($scope.saleOrders.TotalAmountOC - $scope.saleOrders.DiscountAmountOC + $scope.saleOrders.ShippingAmount + $scope.saleOrders.TotalVATAmountOC)) {
                        //gán lại trạng thái
                        $scope.saleOrders.StatusID = 1;
                    }
                    else {
                        $scope.saleOrders.StatusID = 15;
                    }
                    ///gọi  api update lại trạng thái cho đơn hàng
                    apiService.put("api/saleOrder/update", $scope.saleOrders, function (result) {
                        apiService.post('api/saleOrder/create_receipt', $scope.receipt,
                            function (result) {
                                notificationService.displaySuccess('Thanh toán thành công');
                                $scope.getInfo();
                            },
                            function (error) {
                                notificationService.displayError('Thanh toán không thành công');
                            });
                    });


                }
                if ($scope.saleOrders.StatusID == 2) {
                    if (Number($scope.Infopay.customerpaid) + Number($scope.Infopay.txt_customerpay) == Number($scope.saleOrders.TotalAmountOC - $scope.saleOrders.DiscountAmountOC + $scope.saleOrders.ShippingAmount + $scope.saleOrders.TotalVATAmountOC)) {
                        //gán lại trạng thái
                        $scope.saleOrders.StatusID = 4;
                    }
                    else {
                        $scope.saleOrders.StatusID = 45;
                    }
                    ///gọi  api update lại trạng thái cho đơn hàng
                    apiService.put("api/saleOrder/update", $scope.saleOrders, function (result) {
                        apiService.post('api/saleOrder/create_receipt', $scope.receipt,
                            function (result) {
                                notificationService.displaySuccess('Thanh toán thành công');
                                $scope.getInfo();
                            },
                            function (error) {
                                notificationService.displayError('Thanh toán không thành công');
                            });
                    });
                }
                if ($scope.saleOrders.StatusID == 3) {
                    // thanh toán đủ đơn hàng hoàn thành
                    if (Number($scope.Infopay.customerpaid) + Number($scope.Infopay.txt_customerpay) == Number($scope.saleOrders.TotalAmountOC - $scope.saleOrders.DiscountAmountOC + $scope.saleOrders.ShippingAmount + $scope.saleOrders.TotalVATAmountOC)) {
                        //gán lại trạng thái
                        $scope.saleOrders.StatusID = 1;
                    }
                    else {
                        $scope.saleOrders.StatusID = 15;
                    }
                    ///gọi  api update lại trạng thái cho đơn hàng
                    apiService.put("api/saleOrder/update", $scope.saleOrders, function (result) {
                        apiService.post('api/saleOrder/create_receipt', $scope.receipt,
                            function (result) {
                                notificationService.displaySuccess('Thanh toán thành công');
                                $scope.getInfo();
                            },
                            function (error) {
                                notificationService.displayError('Thanh toán không thành công');
                            });
                    });

                }
                if ($scope.saleOrders.StatusID == 8) {
                    if (Number($scope.Infopay.customerpaid) + Number($scope.Infopay.txt_customerpay) == Number($scope.saleOrders.TotalAmountOC - $scope.saleOrders.DiscountAmountOC + $scope.saleOrders.ShippingAmount + $scope.saleOrders.TotalVATAmountOC)) {
                        //gán lại trạng thái
                        $scope.saleOrders.StatusID = 9;
                    }
                    else {
                        $scope.saleOrders.StatusID = 95;
                    }
                    ///gọi  api update lại trạng thái cho đơn hàng
                    apiService.put("api/saleOrder/update", $scope.saleOrders, function (result) {
                        apiService.post('api/saleOrder/create_receipt', $scope.receipt,
                            function (result) {
                                notificationService.displaySuccess('Thanh toán thành công');
                                $scope.getInfo();
                            },
                            function (error) {
                                notificationService.displayError('Thanh toán không thành công');
                            });
                    });

                }

                //báo cáo công nợ khách hàng(thanh toán thì công nợ giảm xuống)
                var customer = {};
                apiService.get('api/Customer/getbyid/' + $scope.saleOrders.ObjectID, null,
                    function (result) {
                        customer = result.data;

                        if (customer.ObjectID === $scope.saleOrders.ObjectID) {
                            if (customer.Debt === 0) {
                                customer.Debt = customer.Debt;
                            } else {
                                customer.Debt = customer.Debt - $scope.Infopay.txt_customerpay;
                            }
                            apiService.put('api/Customer/update', customer

                            );
                        }
                    }, function (error) {
                        notificationService.displayError('Thất bại !!');
                    }
                );

            }
            //huy don
            if (param == 'huy_don') {

                $ngBootbox.confirm('Bạn có chắc muốn hủy đơn hàng?').then(function () {
                    $scope.saleOrders.StatusID = 10;
                    ///gọi  api update lại trạng thái cho đơn hàng
                    apiService.put("api/saleOrder/update", $scope.saleOrders, function () {
                        notificationService.displaySuccess('Hủy đơn hàng thành công');
                    }, function () {
                        notificationService.displayError('Không thành công');
                    })
                });
            }
            // $scope.getInfo();
        }


        //in hóa đơn
        $scope.printInvoice = printInvoice;
        function printInvoice() {
            var contents = document.getElementById("dvContents").innerHTML;
            var frame1 = document.createElement('iframe');
            frame1.name = "frame1";
            frame1.style.position = "absolute";
            frame1.style.top = "-1000000px";
            document.body.appendChild(frame1);
            var frameDoc = frame1.contentWindow ? frame1.contentWindow : frame1.contentDocument.document ? frame1.contentDocument.document : frame1.contentDocument;
            frameDoc.document.open();
            frameDoc.document.write('<html><head><title>Đơn hàng</title>');
            frameDoc.document.write('</head><body>');
            frameDoc.document.write(contents);
            frameDoc.document.write('</body></html>');
            frameDoc.document.close();
            setTimeout(function () {
                window.frames["frame1"].focus();
                window.frames["frame1"].print();
                document.body.removeChild(frame1);
            }, 500);
            return false;
        }

        //hàm định dạng tiền
        $scope.Currency = Currency;
        function Currency(str) {
            str = str - -0.5;
            var arr = new String(str);
            var arr1 = '';
            for (var i = 0; i < arr.length; i++) {
                if (arr[i] != '.') {
                    arr1 = arr1 + arr[i];
                }
                else {
                    if (arr[i + 1] >= '5') {
                        arr1[i] = arr[i] - -1;
                    }
                    break;
                }
            }
            var Gia = "";
            var dem = 0;
            for (var i = arr1.length - 1; i >= 0; i--) {
                dem++;
                Gia = Gia + arr1[i];
                if (dem == 3 && i != 0) {
                    Gia = Gia + ",";
                    dem = 0;
                }
            }
            var arr2 = new String(Gia);
            var GiaMoi = '';
            for (var i = arr2.length - 1; i >= 0; i--) {
                GiaMoi = GiaMoi + arr2[i];
            }
            return GiaMoi;
        }
        //currency --> định dạng số
        //Dinh dang so
        $scope.ConvertNumber = ConvertNumber;
        function ConvertNumber(str) {
            var arr = new String(str);
            var monney = '';
            for (var i = 0; i < arr.length; i++) {
                if (arr[i] != ',') {
                    monney = monney + arr[i];
                }
            }
            return monney;
        }

        // tính tiền khách hàng phải trả sau khi thanh toán 1phần
        $scope.customerpay_calculate = customerpay_calculate;
        function customerpay_calculate() {
            $scope.Infopay.customerpay = $scope.saleOrders.TotalAmountOC + $scope.saleOrders.TotalVATAmountOC - $scope.Infopay.customerpaid - ConvertNumber($scope.Infopay.txt_customerpay) - $scope.saleOrders.DiscountAmountOC + $scope.saleOrders.ShippingAmount;
            $scope.Infopay.txt_customerpay = Currency(ConvertNumber($scope.Infopay.txt_customerpay));
        }

        $scope.getInfo();
        $scope.getRegion = getRegion;
        $scope.listRegion = [];
        $scope.selectDistrict = selectDistrict;
        $scope.listRegionaddress = [];
        $scope.selectTown = selectTown;
        $scope.listRegionTown = [];
        function selectDistrict() {
            apiService.get('api/Region/getaddress?key=' + $scope.customer.ObjectState, null, function (result) {
                $scope.listRegionaddress = result.data;

            }, function () {
                console.log('load items failed');
            });
        }
        function selectTown() {

            apiService.get('api/Region/getaddress?key=' + $scope.customer.ObjectDistrict, null, function (result) {
                $scope.listRegionTown = result.data;

            }, function () {
                console.log('load items failed');
            });
        }
        function getRegion() {
            apiService.get('api/Region/getone', null, function (result) {

                $scope.listRegion = result.data;

            }, function () {
                console.log('load items failed');
            });
        }

        $scope.getRegion();

    }
})(angular.module('tiktak.saleOrder'));